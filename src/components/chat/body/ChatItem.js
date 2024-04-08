import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    ChatForwardIcon,
    ClockIcon,
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
import LinkPreview from '~/components/linkPreview';
import Message from '~/components/message';
import MessageImageList from '~/components/messageImageList';
import Popup from '~/components/popup';
import ReplyMessage from '~/components/replyMessage';
import StickerItem from '~/components/sticker/StickerItem';
import Toast from '~/components/toast';
import { DeleteMessageStatus, sentMessageStatus } from '~/constants';
import { setReply } from '~/features/chat/chatSlice';
import { addPinMessage, setMessages, updateMessage } from '~/features/chats/chatsSlice';
import { getReplyMessages, setOffsetTop, updateDeletedMessage } from '~/features/messages/messagesSlice';
import { setLocationError } from '~/features/toastAll/toastAllSlice';
import { useLoader, useToast } from '~/hooks';
import { deleteMessageForMe, pinMessage, recallMessage } from '~/services';
import {
    classNames,
    convertToDMS,
    getMessageNoDelete,
    getTimeChat,
    getTimeChatSeparate,
    googleMaps,
    isCanRecall,
    isImageFileByType,
    isShowTimeChatSeparate,
    isValidURL,
    isVideoFile,
    location,
} from '~/utils';
import ChatImage from './ChatImage';
import ChatItemButton from './ChatItemButton';
import ChatItemReaction from './ChatItemReaction';
import ChatItemSeparate from './ChatItemSeparate';
import Reaction from './ReactionChat';

// TODO
// [x] Chat text
// [x] Chat file
// [x] Chat Emoji
// [x] Recall message
// [ ] Delete message for me (24h) --> BE upload last message
// [ ] Forward message
// [x] Pin message
// [x] Pin conversation
// [x] Reply message
// [x] Load more message
// [x] Location
const ChatItem = ({ isMe, chat, prevChat, scrollY = () => {} }) => {
    const [, startTransition] = useTransition();
    const { t } = useTranslation();
    const [react, setReact] = useState();
    const ref = useRef();
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.messages);
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const [toastRecall, setToastRecall] = useToast(1000);
    const { socket } = useSelector((state) => state.socket);
    const { google, places, marker } = useLoader();

    const url = useMemo(() => {
        const message = (chat?.messages || []).find(
            (message) => message.type === 'text' && isValidURL(message.content),
        );

        return message?.content;
    }, [chat?.messages]);
    const isYourPrev = prevChat?.sender._id === chat.sender?._id;
    const date = new Date(chat.updatedAt || chat.timeSend);
    const prevDate = prevChat && new Date(prevChat.updatedAt || prevChat.timeSend);
    const showSeparate = prevDate && isShowTimeChatSeparate(date, prevDate);
    const reacts = [];
    const isImageList = chat.files?.length > 0 && isImageFileByType(chat.files[0].type || chat.files[0].contentType);
    const isVideo = chat.files?.length > 0 && isVideoFile(chat.files[0].link || chat.files[0].name);
    const loading = chat.state === sentMessageStatus.SENDING;
    const recalled = chat?.deleted === DeleteMessageStatus.RECALL;

    const handleClickReply = (message) => {
        const mess = messages.find((mess) => mess._id === message._id);

        if (mess) scrollY(mess.offsetTop);
        else {
            scrollY(0);

            startTransition(async () => {
                const messages = await dispatch(getReplyMessages(message._id)).unwrap();

                dispatch(setMessages(messages));

                scrollY(0);
            });
        }
    };
    const handleReply = () => dispatch(setReply(chat));

    const handleRecall = useCallback(() => {
        if (isCanRecall(chat.createdAt)) {
            recallMessage(chat._id).then();
            dispatch(updateDeletedMessage({ _id: chat._id, deleted: DeleteMessageStatus.RECALL }));
            dispatch(
                updateMessage({
                    conversationId: chat.conversation._id,
                    message: { ...chat, deleted: DeleteMessageStatus.RECALL },
                }),
            );
            socket.emit('recallMessage', { ...chat, conversation: active });
        } else setToastRecall(true);
    }, [active, chat, dispatch, setToastRecall, socket]);

    const handleDeleteForMe = useCallback(() => {
        if (!chat?._id || !chat?.conversation?._id) return;

        deleteMessageForMe(chat._id).then();
        dispatch(updateDeletedMessage({ _id: chat._id, deleted: DeleteMessageStatus.DELETE_FOR_ME }));
        dispatch(
            updateMessage({ conversationId: chat.conversation._id, message: getMessageNoDelete(messages, chat._id) }),
        );
    }, [chat?._id, chat?.conversation?._id, dispatch, messages]);

    const handlePinMessage = useCallback(() => {
        pinMessage(chat._id).then();
        dispatch(addPinMessage({ conversationId: chat.conversation._id, message: chat }));
        socket.emit('pinMessage', { message: chat, userId: user._id, users: active.users });
    }, [active.users, chat, dispatch, socket, user._id]);

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
    }, [handleDeleteForMe, handlePinMessage, handleRecall, isMe, t]);

    useEffect(() => {
        dispatch(
            setOffsetTop({
                _id: chat._id,
                offsetTop: ref.current.offsetTop,
            }),
        );
    }, [chat._id, dispatch]);

    useEffect(() => {
        (async () => {
            if (!places?.PlacesService || !marker?.AdvancedMarkerElement) return;
            try {
                googleMaps(location, google, marker, document.querySelector('#map'));
            } catch (error) {
                dispatch(setLocationError(true));
            }
        })();
    }, [dispatch, google, marker, places]);

    return (
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
                        'flex-shrink-0 self-end',
                        !showSeparate && isYourPrev && 'opacity-0',
                    )}
                    src={chat.sender.avatar}
                />
                <div className={isMe ? 'ml-1 mr-2 sm:mr-4' : 'ml-2 sm:ml-4 mr-1'}>
                    {chat.messages?.length > 0 || chat?.files?.length === 1 || recalled ? (
                        <>
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

                                <Message status={chat.deleted} messages={chat.messages || []} isMe={isMe} />

                                {chat.files && isImageList && !recalled ? (
                                    <div className="flex gap-1 px-1 flex-col ex:flex-row flex-wrap">
                                        {chat.files.map((image, index) => (
                                            <ChatImage
                                                loading={loading}
                                                src={image.link || URL.createObjectURL(image)}
                                                name={image.name}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                ) : null}

                                {isVideo && !recalled ? (
                                    <div
                                        className={classNames(
                                            'relative w-fit flex flex-col px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg',
                                            isMe
                                                ? 'rounded-l-lg bg-sidebar-sub-bg dark:bg-dark-sidebar-bg'
                                                : 'rounded-r-lg bg-primary-color bg-opacity-40',
                                        )}
                                    >
                                        <video width="320" height="240" controls>
                                            <source src={chat.files[0].link} type={chat.files[0].type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                ) : null}

                                {chat.files && !isImageList && !recalled && !isVideo
                                    ? chat.files.map((file, index) => <AttachedFile file={file} key={index} />)
                                    : null}

                                {url ? <LinkPreview url={url} /> : null}

                                <div
                                    className={classNames(
                                        'flex items-center text-xs',
                                        isMe
                                            ? 'text-secondary dark:text-dark-secondary'
                                            : 'text-white text-opacity-50 justify-end',
                                    )}
                                >
                                    <ClockIcon className="mr-1" />
                                    <span>{getTimeChat(chat.updatedAt || new Date(chat.timeSend))}</span>
                                </div>

                                {chat.sticker && !recalled ? null : (
                                    <ChatItemReaction
                                        reacts={reacts}
                                        react={react}
                                        className="absolute right-0 bottom-0 translate-y-[calc(100%-7px)]"
                                    />
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
                            {isYourPrev || (
                                <div
                                    className={classNames(
                                        'text-sm font-medium dark:text-[rgb(166,176,207)]',
                                        isMe && 'text-right',
                                    )}
                                >
                                    {chat.sender.name}
                                </div>
                            )}
                        </>
                    ) : null}

                    {chat.location?._id ? (
                        <div
                            className={classNames(
                                'relative w-fit flex flex-col px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg',
                                isMe
                                    ? 'rounded-l-lg bg-sidebar-sub-bg dark:bg-dark-sidebar-bg'
                                    : 'rounded-r-lg bg-primary-color bg-opacity-40',
                            )}
                        >
                            <h5 className="text-sm font-medium line-clamp-1 mb-1">{chat.location.name}</h5>
                            <p className="text-sm line-clamp-1 mb-2.5">{chat.location.vicinity}</p>
                            <a
                                target="_blank"
                                href={`${process.env.REACT_APP_GOOGLE_MAPS_ENDPOINT}/${convertToDMS(
                                    chat.location.coords,
                                )}`}
                                id="map"
                                className="w-[417px] h-[150px]"
                            ></a>
                        </div>
                    ) : null}

                    {chat.sticker ? <StickerItem className="w-[130px] h-[130px]" count={5} url={chat.sticker} /> : null}

                    {chat.files?.length > 1 && isImageList && !recalled ? (
                        <MessageImageList loading={loading} files={chat.files} />
                    ) : null}
                </div>
                {recalled ? null : (
                    <div className={classNames('flex', isMe && 'flex-row-reverse')}>
                        <ChatItemButton onClick={handleReply}>
                            <QuoteRightIcon className="w-[14px] h-[14px]" />
                        </ChatItemButton>
                        {chat.sticker || chat.location ? null : <Reaction setReact={setReact} react={react} />}
                        <Popup data={mores} animation="shift-toward" placement={isMe ? 'bottom-end' : 'bottom-start'}>
                            <ChatItemButton>
                                <MoreFillIcon className="w-[15px] h-[15px] rotate-90" />
                            </ChatItemButton>
                        </Popup>
                    </div>
                )}
            </div>
            {showSeparate && <ChatItemSeparate>{getTimeChatSeparate(prevDate)}</ChatItemSeparate>}
        </div>
    );
};

ChatItem.propTypes = {
    isMe: PropTypes.bool.isRequired,
    chat: PropTypes.object.isRequired,
    nextChat: PropTypes.object,
    scrollY: PropTypes.func,
};

export default ChatItem;
