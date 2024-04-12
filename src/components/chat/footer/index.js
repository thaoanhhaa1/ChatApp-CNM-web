import Tippy from '@tippyjs/react';
import { useWindowSize } from '@uidotdev/usehooks';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, MentionsInput } from 'react-mentions';
import { useDispatch, useSelector } from 'react-redux';
import { checkText } from 'smile2emoji';
import { AttachmentLineIcon, ImageFillIcon, LocationIcon, MicIcon, SendPlaneFillIcon } from '~/assets';
import AttachFiles from '~/components/attachFiles';
import Location from '~/components/location';
import Modal from '~/components/modal';
import PopupMultiLevel from '~/components/popupMultiLevel';
import ReplyMessage from '~/components/replyMessage';
import Toast from '~/components/toast';
import { setChat, setFiles, setReply } from '~/features/chat/chatSlice';
import { addMessage, sendMessage } from '~/features/messages/messagesSlice';
import { resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { useBoolean, useToast } from '~/hooks';
import { getMentions, insertEmojiToChat, isImageFileByType, splitMessage } from '~/utils';
import Button from './Button';
import Emoticon from './Emoticon';
import MentionItem from './Mention';
import SendFiles from './SendFiles';

const Footer = () => {
    const { t } = useTranslation();
    const [selectionStart, setSelectionStart] = useState(-1);
    const { active, activeLoading } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const mentions = useMemo(() => (active?.users ? getMentions(active.users, user) : []), [active?.users, user]);
    const { value: showLocation, setTrue: setShowLocation, setFalse: setHideLocation } = useBoolean(false);
    const { files, reply, chat } = useSelector((state) => state.chat);
    const { socket } = useSelector((state) => state.socket);
    const ref = useRef();
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useToast(1000);

    const handleChange = (e) => dispatch(setChat(checkText(e.target.value)));
    const handleEmojiClick = useCallback(
        (emoji) => {
            const inputElement = ref.current.inputElement;
            const selectionStart = inputElement.selectionStart;

            dispatch(setChat(insertEmojiToChat(emoji, chat, ref.current.inputElement)));
            setSelectionStart(selectionStart + 2);
        },
        [chat, dispatch],
    );

    const handleKeyDown = (e) => {
        if (e.code === 'Enter' && !e.shiftKey) {
            handleSend();
            e.preventDefault();
        }
    };

    const renderUserSuggestion = (mention) => <MentionItem mention={mention} />;
    const displayTransform = (_, display) => `@${display}`;
    const handleCloseReply = () => dispatch(setReply());
    const handleSendFiles = async (files) => {
        files.forEach((file) => {
            const formData = new FormData();
            const timeSend = Date.now();

            formData.append('files', file);
            formData.append('conversationId', active._id);
            formData.append('sender', user);
            formData.append('timeSend', timeSend);

            dispatch(sendMessage(formData));
            dispatch(
                addMessage({
                    sender: user,
                    files: [file],
                    conversationId: active._id,
                    timeSend,
                }),
            );
        });
    };
    const handleSend = () => {
        if (!chat && !files?.length) return;

        const messages = splitMessage(chat);
        const imageFiles = [];
        const otherFiles = [];

        (files || []).forEach((file) => {
            if (isImageFileByType(file.type)) return imageFiles.push(file);

            otherFiles.push(file);
        });

        // Text + 1 image
        if (chat.trim() && imageFiles.length === 1 && !otherFiles.length) {
            const formData = new FormData();
            const timeSend = Date.now();

            formData.append('files', imageFiles[0]);
            formData.append('conversationId', active._id);
            formData.append('sender', user);
            reply?._id && formData.append('reply', reply?._id);
            formData.append('timeSend', timeSend);
            formData.append('messages', JSON.stringify(messages));

            dispatch(sendMessage(formData))
                .unwrap()
                .then(({ data }) => setShowToast(data.invalidMessage));
            dispatch(
                addMessage({
                    sender: user,
                    reply,
                    files: imageFiles,
                    conversationId: active._id,
                    timeSend,
                    messages,
                }),
            );
        } else {
            // Text + n images + n other files
            if (messages.length && chat.trim()) {
                const timeSend = Date.now();
                dispatch(sendMessage({ messages, conversationId: active._id, reply: reply?._id, timeSend }))
                    .unwrap()
                    .then(({ data }) => setShowToast(data.invalidMessage));
                dispatch(
                    addMessage({
                        messages,
                        sender: user,
                        conversationId: active._id,
                        reply,
                        timeSend,
                    }),
                );
            }

            if (imageFiles.length) {
                const formData = new FormData();
                const timeSend = Date.now();

                imageFiles.forEach((file) => formData.append('files', file));
                formData.append('conversationId', active._id);
                formData.append('sender', user);
                formData.append('timeSend', timeSend);

                dispatch(sendMessage(formData));
                dispatch(
                    addMessage({
                        sender: user,
                        files: imageFiles,
                        conversationId: active._id,
                        timeSend,
                    }),
                );
            }

            if (otherFiles.length) handleSendFiles(otherFiles);
        }

        dispatch(setChat(''));
        dispatch(setReply());
        dispatch(setFiles([]));
    };

    const handleCloseLocation = () => {
        setHideLocation();
        dispatch(resetSubs());
    };

    const handleFocus = () => {
        console.log(`Typing: `, Date.now());
        socket.emit('typing', { conversation: active, userId: user._id });
    };

    const handleBlur = () => {
        socket.emit('stopTyping', { conversation: active, userId: user._id });
    };

    useEffect(() => {
        if (!ref.current) return () => {};

        const highlighterElement = ref.current.highlighterElement;
        const inputElement = ref.current.inputElement;

        const handleScroll = () => (highlighterElement.scrollTop = inputElement.scrollTop);

        inputElement.addEventListener('scroll', handleScroll);

        return () => inputElement.removeEventListener('scroll', handleScroll);
    }, []);

    useLayoutEffect(() => {
        const inputElement = ref.current.inputElement;

        if (selectionStart === -1) return;

        inputElement.focus();
        inputElement.setSelectionRange(selectionStart, selectionStart);
    }, [selectionStart]);

    useLayoutEffect(() => {
        const inputElement = ref.current.inputElement;
        const containerElement = ref.current.containerElement;

        const inputWidth = inputElement.clientWidth;

        if (inputWidth < 300) containerElement.classList.add('move');
        else containerElement.classList.remove('move');
    }, [width]);

    return (
        <div>
            <Toast showToast={showToast} message="Invalid message" />
            <div className="flex items-center gap-3 px-2 h-10 border-t border-separate dark:border-dark-separate">
                <Tippy content={t('chat.location')}>
                    <Button onClick={setShowLocation} icon={LocationIcon} />
                </Tippy>
                <SendFiles onSend={handleSendFiles} Icon={AttachmentLineIcon} tooltip={t('chat.attached-file')} />
            </div>
            <div className="border-t border-separate dark:border-dark-separate p-2 sm:p-3 md:p-4 dl:p-5 focus-within:border-primary-color transition-colors duration-150">
                {reply ? <ReplyMessage showClose isMe onClose={handleCloseReply} message={reply} /> : null}

                <div className="items-end flex gap-2">
                    <label className="flex-1">
                        <MentionsInput
                            onKeyDown={handleKeyDown}
                            allowSpaceInQuery
                            forceSuggestionsAboveCursor
                            spellCheck={false}
                            maxLength={135813}
                            autoComplete="off"
                            autoCorrect="off"
                            ref={ref}
                            rows={1}
                            value={chat}
                            onChange={handleChange}
                            placeholder={t('chat.chat')}
                            className="mentions-input rounded text-sm leading-normal placeholder:text-secondary dark:placeholder:text-dark-secondary text-input dark:text-dark-primary bg-input-bg dark:bg-dark-input-bg flex-1 my-0.5"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            <Mention
                                displayTransform={displayTransform}
                                markup="@~~__id__~~__display__~~@"
                                appendSpaceOnAdd
                                className="text-[#0068ff]"
                                trigger="@"
                                data={mentions}
                                renderSuggestion={renderUserSuggestion}
                            />
                        </MentionsInput>
                    </label>
                    <div className="flex">
                        <Emoticon handleEmojiClick={handleEmojiClick} />
                        <SendFiles
                            onSend={handleSendFiles}
                            Icon={ImageFillIcon}
                            tooltip={t('chat.images')}
                            accept="image/*"
                        />
                        <Tippy content={t('chat.micro')}>
                            <Button icon={MicIcon} />
                        </Tippy>
                        <Button disabled={activeLoading} onClick={handleSend} icon={SendPlaneFillIcon} type="primary" />
                    </div>
                </div>
                {files.length > 0 && <AttachFiles />}
            </div>

            <Modal show={showLocation} onClickOutside={handleCloseLocation}>
                <PopupMultiLevel onClose={handleCloseLocation}>
                    <Location showLocation={showLocation} onClose={handleCloseLocation} />
                </PopupMultiLevel>
            </Modal>
        </div>
    );
};

Footer.propTypes = {};

export default memo(Footer);
