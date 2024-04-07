import { useWindowSize } from '@uidotdev/usehooks';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, MentionsInput } from 'react-mentions';
import { useDispatch, useSelector } from 'react-redux';
import { checkText } from 'smile2emoji';
import { ImageFillIcon, LocationIcon, MicIcon, SendPlaneFillIcon } from '~/assets';
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
import { classNames, getMentions, insertEmojiToChat, isImageFileByType, splitMessage } from '~/utils';
import Button from './Button';
import Emoticon from './Emoticon';
import MentionItem from './Mention';
import SendFiles from './SendFiles';

// TODO Chat and Reply
// Send message: messages, files, conversationId, reply, sticker
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
    // TODO Send file
    const handleSendFiles = async (files) => {
        const timeSend = Date.now();

        const formData = new FormData();

        files.forEach((file) => formData.append('files', file));
        formData.append('conversationId', active._id);
        formData.append('sender', user);
        reply?._id && formData.append('reply', reply?._id);
        formData.append('timeSend', timeSend);

        dispatch(sendMessage(formData));
        dispatch(
            addMessage({
                sender: user,
                reply,
                files,
                conversationId: active._id,
                timeSend,
            }),
        );
        dispatch(setChat(''));
        dispatch(setReply());
    };
    const handleSend = () => {
        if (!chat && !files?.length) return;

        const messages = splitMessage(chat);
        const timeSend = Date.now();
        const imageFiles = [];
        const otherFiles = [];

        (files || []).forEach((file) => {
            if (isImageFileByType(file.type)) return imageFiles.push(file);

            otherFiles.push(file);
        });

        // Text + 1 image
        if (chat.trim() && imageFiles.length === 1 && !otherFiles.length) {
            const formData = new FormData();

            formData.append('files', imageFiles[0]);
            formData.append('conversationId', active._id);
            formData.append('sender', user);
            reply?._id && formData.append('reply', reply?._id);
            formData.append('timeSend', timeSend);
            formData.append('messages', messages);

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

            if (otherFiles.length) {
                otherFiles.forEach((file) => {
                    const formData = new FormData();

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
            }
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
            <Toast
                message="Invalid message"
                className={classNames('transition-opacity duration-150', showToast ? 'opacity-100' : 'opacity-0')}
            />
            <div className="flex flex-col justify-center gap-2 px-2 h-10 border-t border-separate dark:border-dark-separate">
                <Button onClick={setShowLocation} icon={LocationIcon} />
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
                        {/* <SendFiles onSend={handleSendFiles} Icon={AttachmentLineIcon} tooltip={t('chat.attached-file')} /> */}
                        <SendFiles
                            onSend={handleSendFiles}
                            Icon={ImageFillIcon}
                            tooltip={t('chat.images')}
                            accept="image/*"
                        />
                        <Button icon={MicIcon} />
                        <Button disabled={activeLoading} onClick={handleSend} icon={SendPlaneFillIcon} type="primary" />
                    </div>
                </div>
                {files.length > 0 && <AttachFiles />}
            </div>

            <Modal show={showLocation} onClickOutside={handleCloseLocation}>
                <PopupMultiLevel onClose={handleCloseLocation}>
                    <Location onClose={handleCloseLocation} />
                </PopupMultiLevel>
            </Modal>
        </div>
    );
};

Footer.propTypes = {};

export default memo(Footer);
