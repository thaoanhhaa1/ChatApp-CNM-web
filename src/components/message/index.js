import PropTypes from 'prop-types';
import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    ChatForwardIcon,
    DeleteBinLineIcon,
    FileCopyIcon,
    MessageRecallIcon,
    MoreFillIcon,
    PinAngleIcon,
    QuoteRightIcon,
    SaveLineIcon,
} from '~/assets';
import AttachedFile from '~/components/attachedFile';
import Avatar from '~/components/avatar';
import ChatMessage from '~/components/chatMessage';
import ForwardMessage from '~/components/forwardMessage';
import LinkPreview from '~/components/linkPreview';
import MessageImageList from '~/components/messageImageList';
import Popup from '~/components/popup';
import ReplyMessage from '~/components/replyMessage';
import StickerItem from '~/components/sticker/StickerItem';
import Toast from '~/components/toast';
import { DeleteMessageStatus, messageNotificationType, sentMessageStatus } from '~/constants';
import { MessageProvider } from '~/context';
import { removeAttachedFile } from '~/features/attachedFiles/attachedFilesSlice';
import { setReply } from '~/features/chat/chatSlice';
import { addPinMessage, changeLastMessage, setMessages, updateMessage } from '~/features/chats/chatsSlice';
import { getReplyMessages, setOffsetTop, updateDeletedMessage } from '~/features/messages/messagesSlice';
import { setLocationError } from '~/features/toastAll/toastAllSlice';
import { useBoolean, useLoader, useSendMessage, useToast } from '~/hooks';
import messageServices from '~/services/message.service';
import {
    classNames,
    getTimeChatSeparate,
    googleMaps,
    isCanRecall,
    isImageFileByType,
    isShowTimeChatSeparate,
    isValidURL,
    isVideoFile,
    location,
} from '~/utils';
import officeCanView from '~/utils/officeCanView';
import MessageNotification from '../messageNotification';
import OfficeViewer from '../officeViewer';
import Button from './Button';
import MessageImage from './MessageImage';
import MessageLoading from './MessageLoading';
import MessageLocation from './MessageLocation';
import MessageReaction from './MessageReaction';
import MessageSeparate from './MessageSeparate';
import MessageTime from './MessageTime';
import MessageVideo from './MessageVideo';
import React from './React';
import { withErrorBoundary } from 'react-error-boundary';

const Message = ({ chat, prevChat, scrollY = () => {} }) => {
    const [, startTransition] = useTransition();
    const { t } = useTranslation();
    const [showForward, setShowForward] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();
    const { messages, loading: messagesLoading } = useSelector((state) => state.messages);
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const [toastRecall, setToastRecall] = useToast(1500);
    const { google, places, marker } = useLoader();
    const isMe = chat.sender?._id === user._id;

    const url = useMemo(() => {
        const message = (chat?.messages || []).find(
            (message) => message.type === 'text' && isValidURL(message.content),
        );

        return message?.content;
    }, [chat?.messages]);
    const isYourPrev = prevChat?.sender?._id === chat.sender?._id;
    const date = new Date(chat.updatedAt || chat.timeSend);
    const prevDate = prevChat && new Date(prevChat.updatedAt || prevChat.timeSend);
    const showSeparate = prevDate && isShowTimeChatSeparate(date, prevDate);
    const lengthFiles = chat.files?.length;
    const firstFile = lengthFiles ? chat.files?.[0] : null;
    const isImageList = firstFile && isImageFileByType(firstFile.type || firstFile.contentType);
    const isVideo = firstFile && isVideoFile(firstFile.type);
    const loading = chat.state === sentMessageStatus.SENDING;
    const recalled = chat.deleted === DeleteMessageStatus.RECALL;
    const fileCanView = useMemo(() => firstFile && officeCanView(firstFile), [firstFile]);
    const { value: viewFile, setTrue: setShowViewFile, setFalse: setHideViewFile } = useBoolean(false);
    const [isScrollToReply, setIsScrollToReply] = useState();
    const { handleSendNotificationMessage } = useSendMessage();

    const handleClickReply = (message) => {
        if (!message._id) return;

        const mess = messages.find((mess) => mess._id === message._id);

        if (mess) scrollY(mess.offsetTop);
        else {
            scrollY(0);

            startTransition(async () => {
                const messages = await dispatch(
                    getReplyMessages({
                        messageId: message._id,
                        conversationId: chat.conversation?._id,
                    }),
                ).unwrap();

                dispatch(setMessages(messages));
                setIsScrollToReply(message._id);
            });
        }
    };
    const handleReply = () => dispatch(setReply(chat));

    const handleRecall = useCallback(() => {
        if (isCanRecall(chat.createdAt)) {
            messageServices.recallMessage(chat._id).then();
            dispatch(updateDeletedMessage({ _id: chat._id, deleted: DeleteMessageStatus.RECALL }));
            if (chat.deleted === DeleteMessageStatus.NO_DELETE)
                dispatch(
                    updateMessage({
                        conversationId: chat.conversation?._id,
                        message: { ...chat, deleted: DeleteMessageStatus.RECALL },
                    }),
                );

            const files = chat.files || [];
            files.forEach((file) => dispatch(removeAttachedFile({ conversationId: chat.conversation._id, file })));
            socket.emit('recallMessage', { ...chat, conversation: active });
        } else setToastRecall(true);
    }, [active, chat, dispatch, setToastRecall, socket]);

    const handleDeleteForMe = useCallback(async () => {
        if (!chat?._id || !chat?.conversation?._id) return;

        const res = await toast.promise(messageServices.deleteMessageForMe(chat._id), {
            pending: t('chat.delete-for-me-pending'),
            success: t('chat.delete-for-me-success'),
            error: t('chat.delete-for-me-error'),
        });

        const files = chat.files || [];

        files.forEach((file) => dispatch(removeAttachedFile({ conversationId: chat.conversation._id, file })));
        dispatch(updateDeletedMessage({ _id: chat._id, deleted: DeleteMessageStatus.DELETE_FOR_ME }));
        dispatch(
            updateMessage({
                conversationId: chat.conversation._id,
                message: {
                    ...chat,
                    deleted: DeleteMessageStatus.DELETE_FOR_ME,
                },
            }),
        );
        dispatch(
            changeLastMessage({
                conversationId: chat.conversation._id,
                message: res.data.lastMessage,
                prevMessage: chat,
            }),
        );
    }, [chat, dispatch, t]);

    const handlePinMessage = useCallback(async () => {
        if (!chat?._id || !chat?.conversation?._id) return;

        // TODO Toast promise
        const [message] = await Promise.all([
            messageServices.addMessageNotification({
                type: messageNotificationType.PIN_MESSAGE,
                conversationId: active._id,
                messageId: chat._id,
            }),
            messageServices.pinMessage(chat._id),
        ]);
        dispatch(addPinMessage({ conversationId: chat.conversation._id, message: chat }));
        socket.emit('pinMessage', { message: chat, userId: user._id, users: active.users });
        handleSendNotificationMessage(message);
    }, [active._id, active.users, chat, dispatch, handleSendNotificationMessage, socket, user._id]);

    const handleClickForward = useCallback(() => setShowForward(true), []);
    const handleCloseForward = useCallback(() => setShowForward(false), []);

    const mores = useMemo(() => {
        const mores = [
            {
                icon: FileCopyIcon,
                title: t('chat.more.copy'),
                separate: true,
            },
            {
                icon: PinAngleIcon,
                title: t('chat.more.pin'),
                onClick: handlePinMessage,
            },
            {
                icon: SaveLineIcon,
                title: t('chat.more.save'),
            },
            {
                icon: ChatForwardIcon,
                title: t('chat.more.forward'),
                onClick: handleClickForward,
            },
            {
                icon: MessageRecallIcon,
                title: t('chat.more.recall'),
                onClick: handleRecall,
            },
            {
                icon: DeleteBinLineIcon,
                title: t('chat.more.delete-for-me'),
                onClick: handleDeleteForMe,
            },
        ];

        if (!isMe) mores.splice(4, 1);

        return mores;
    }, [handleClickForward, handleDeleteForMe, handlePinMessage, handleRecall, isMe, t]);

    useEffect(() => {
        if (!chat?._id || typeof ref.current?.offsetTop === 'undefined') return;

        dispatch(
            setOffsetTop({
                _id: chat._id,
                offsetTop: ref.current.offsetTop,
            }),
        );
    }, [chat?._id, messages?.length, dispatch]);

    useEffect(() => {
        (async () => {
            if (!places?.PlacesService || !marker?.AdvancedMarkerElement || !chat.location) return;
            try {
                googleMaps(location, google, marker, document.querySelector('#map'));
            } catch (error) {
                dispatch(setLocationError(true));
            }
        })();
    }, [chat.location, dispatch, google, marker, places]);

    useEffect(() => {
        if (!isScrollToReply || messagesLoading) return;

        const mess = messages.find((mess) => mess._id === isScrollToReply);

        if (mess?.offsetTop) {
            scrollY(40);
            setIsScrollToReply();
        }
    }, [isScrollToReply, messages, messagesLoading, scrollY]);

    if (chat?.notification) return <MessageNotification message={chat} />;

    if (!chat.messages?.length && !firstFile && !chat?.location && !chat?.sticker) {
        return null;
    }
    return (
        <MessageProvider value={{ isMe, chatId: chat._id, statuses: chat.statuses }}>
            <div ref={ref} className="flex flex-col gap-2 ex:gap-3 sm:gap-4">
                <Toast showToast={toastRecall} message={t('chat.recall-notify')} />
                <div
                    className={classNames(
                        'max-w-[90%] ex:max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] flex',
                        isMe && 'flex-row-reverse ml-auto',
                    )}
                >
                    <Avatar
                        containerClassName={classNames(
                            'self-end',
                            !showSeparate && isYourPrev && !prevChat.notification && 'opacity-0',
                        )}
                        src={isMe ? user.avatar : chat.sender.avatar}
                    />
                    <div
                        className={classNames(
                            'relative',
                            isMe ? 'ml-1 mr-2 sm:mr-4 flex flex-col items-end' : 'ml-2 sm:ml-4 mr-1',
                        )}
                    >
                        <div className={classNames('flex gap-1 group/message', isMe ? 'flex-row-reverse' : '')}>
                            <div
                                className={classNames(
                                    'relative w-fit flex flex-col gap-1 px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg',
                                    isMe
                                        ? 'rounded-l-lg bg-sidebar-sub-bg dark:bg-dark-sidebar-bg'
                                        : 'rounded-r-lg bg-primary-color bg-opacity-40',
                                )}
                            >
                                {chat.reply && !recalled ? (
                                    <ReplyMessage isMe={isMe} onClick={handleClickReply} message={chat.reply} />
                                ) : null}

                                <ChatMessage status={chat.deleted} messages={chat.messages || []} isMe={isMe} />

                                {lengthFiles === 1 && isImageList && !recalled ? (
                                    <MessageImage
                                        loading={loading}
                                        src={firstFile.link || URL.createObjectURL(firstFile)}
                                        name={firstFile.name}
                                    />
                                ) : null}

                                {isImageList && lengthFiles > 1 && !recalled ? (
                                    <MessageImageList loading={loading} files={chat.files} />
                                ) : null}

                                {isVideo && !recalled ? <MessageVideo loading={loading} file={firstFile} /> : null}

                                {firstFile && !isImageList && !recalled && !isVideo
                                    ? chat.files.map((file, index) => (
                                          <AttachedFile
                                              canView={fileCanView}
                                              onClick={setShowViewFile}
                                              key={index}
                                              file={file}
                                          />
                                      ))
                                    : null}

                                {url && !recalled ? <LinkPreview url={url} /> : null}

                                {recalled ? null : <MessageLocation isMe={isMe} location={chat.location} />}

                                {chat.sticker && !recalled ? (
                                    <StickerItem className="w-[130px] h-[130px]" count={5} url={chat.sticker} />
                                ) : null}

                                <MessageTime time={chat.updatedAt || new Date(chat.timeSend)} />

                                {chat.sticker || recalled ? null : (
                                    <MessageReaction className="absolute right-0 bottom-0 translate-y-[calc(100%-7px)]" />
                                )}

                                <MessageLoading loading={loading} />
                            </div>
                            {recalled || loading ? null : (
                                <div
                                    className={classNames(
                                        'flex opacity-0 group-hover/message:opacity-100 transition-all',
                                        isMe && 'flex-row-reverse',
                                    )}
                                >
                                    <Button onClick={handleReply}>
                                        <QuoteRightIcon className="w-[14px] h-[14px]" />
                                    </Button>
                                    {chat.sticker || chat.location ? null : <React />}
                                    <Popup
                                        data={mores}
                                        animation="shift-toward"
                                        placement={isMe ? 'bottom-end' : 'bottom-start'}
                                    >
                                        <Button>
                                            <MoreFillIcon className="w-[15px] h-[15px] rotate-90" />
                                        </Button>
                                    </Popup>
                                </div>
                            )}
                        </div>
                        <div
                            className={classNames(
                                'border-5 w-0',
                                isMe
                                    ? 'border-sidebar-sub-bg dark:border-dark-sidebar-bg ml-auto border-b-transparent border-l-transparent dark:border-b-transparent dark:border-l-transparent'
                                    : 'border-primary-color border-opacity-40 border-r-transparent border-b-transparent',
                            )}
                        />
                        {(!isYourPrev || showSeparate) && (
                            <div
                                className={classNames(
                                    'text-sm font-medium dark:text-[rgb(166,176,207)]',
                                    isMe && 'text-right',
                                )}
                            >
                                {isMe ? user.name : chat.sender.name}
                            </div>
                        )}
                    </div>
                </div>
                {showSeparate && <MessageSeparate>{getTimeChatSeparate(prevDate)}</MessageSeparate>}
                <ForwardMessage messageId={chat?._id} show={showForward} handleClickOutside={handleCloseForward} />

                {fileCanView && viewFile && firstFile?.link ? (
                    <OfficeViewer
                        viewer={fileCanView}
                        file={firstFile}
                        user={chat.sender}
                        date={chat.updatedAt}
                        onClose={setHideViewFile}
                    />
                ) : null}
            </div>
        </MessageProvider>
    );
};

Message.propTypes = {
    chat: PropTypes.object.isRequired,
    prevChat: PropTypes.object,
    scrollY: PropTypes.func,
};

export default withErrorBoundary(memo(Message), {
    fallback: null,
    onError: (error, info) => {
        toast.error('Message::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
