import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FileTextFillIcon, ImageFillIcon, LocationIcon, MoreFillIcon, PinFilledIcon, StickerSmileIcon } from '~/assets';
import { DeleteMessageStatus } from '~/constants';
import { useLayout } from '~/context';
import { setActive, togglePin } from '~/features/chats/chatsSlice';
import { togglePinConversation as togglePinConversationService } from '~/services';
import {
    classNames,
    getLastMessageNoDeleted,
    getNameConversation,
    getTimeChat,
    getUnseenMessageNumber,
    isImageFileByType,
    isPinConversation,
} from '~/utils';
import Avatar from '../avatar';
import ChatMessage from '../chatMessage';
import Popup from '../popup';
import Typing from '../typing';

const ChatItem = ({ chat, active }) => {
    const { t } = useTranslation();
    const { setShowChat } = useLayout();
    const { user } = useSelector((state) => state.user);
    const { active: activeChat } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const receiver = useMemo(() => (chat.isGroup ? {} : chat.users.find((u) => u._id !== user._id)), [chat, user]);
    const lastMessage = getLastMessageNoDeleted(chat.messages) || chat.lastMessage;
    const isHasFiles = lastMessage?.files?.length;
    const isImageList = isHasFiles && isImageFileByType(lastMessage.files[0].type);
    const isPin = isPinConversation(chat, user);
    const isTyping = chat.users.some((u) => u.typing);
    const conversationName = getNameConversation(chat, user);

    const togglePinConversation = useCallback(() => {
        // TODO Unpin
        togglePinConversationService(chat._id).then();
        dispatch(togglePin({ conversationId: chat._id, userId: user._id }));
    }, [chat._id, dispatch, user._id]);

    const subTitle = useMemo(() => {
        if (lastMessage?.sticker) return t('chats.sticker');

        if (isImageList) return t('chats.photo');

        if (isHasFiles) return lastMessage?.files[0].name;

        if (lastMessage.location) return lastMessage.location.vicinity;

        return '';
    }, [lastMessage?.sticker, lastMessage?.files, lastMessage.location, t, isImageList, isHasFiles]);
    const more = useMemo(() => {
        const more = [
            {
                title: t('chats.more.mark-as-unread'),
                separate: true,
            },
            {
                title: t('chats.more.add-to-group'),
                separate: true,
            },
            {
                title: t('chats.more.delete-conversation'),
                separate: true,
            },
            {
                title: t('chats.more.report'),
            },
        ];

        if (isPin)
            more.unshift({
                title: t('chats.more.unpin'),
                separate: true,
                onClick: togglePinConversation,
            });
        else
            more.unshift({
                title: t('chats.more.pin'),
                separate: true,
                onClick: togglePinConversation,
            });

        return more;
    }, [isPin, t, togglePinConversation]);

    const message = chat.lastMessage;
    const recalled = message?.deleted === DeleteMessageStatus.RECALL;

    const handleClickChat = () => {
        setShowChat(true);
        dispatch(setActive(chat));
    };

    return (
        <div
            className={classNames(
                'group/chat rounded cursor-pointer px-2.5 dl:px-5 py-1.5 dl:py-4 flex items-center gap-2.5 dl:gap-4 transition-all duration-400 hover:bg-light dark:hover:bg-dark-separate',
                active && 'bg-light dark:bg-dark-separate',
            )}
            onClick={handleClickChat}
        >
            <Avatar status={receiver.status} src={chat.picture} />
            <div className="flex-1 flex flex-col gap-1">
                <div className="mb-1 flex gap-1 items-center justify-between">
                    <h5 className="text-mm font-semibold line-clamp-1">{conversationName}</h5>
                    {message ? (
                        <span className="text-ex text-secondary dark:text-dark-secondary text-nowrap group-hover/chat:hidden">
                            {getTimeChat(message.updatedAt || new Date(message.timeSend))}
                        </span>
                    ) : null}
                    <div className="group-hover/chat:block hidden">
                        <Popup data={more}>
                            <span
                                onClick={(e) => e.stopPropagation()}
                                className="hover:bg-black hover:bg-opacity-5 transition-colors duration-150 flex w-[18px] h-[18px] justify-center items-center rounded"
                            >
                                <MoreFillIcon className="w-[14px] h-[14px]" />
                            </span>
                        </Popup>
                    </div>
                </div>
                <div className="flex gap-1 items-center justify-between">
                    {(isTyping && <Typing />) || (
                        <div className="flex gap-1 items-center">
                            {!recalled && isImageList ? (
                                <span className="text-secondary dark:text-dark-secondary">
                                    <ImageFillIcon className="w-[14px] h-[14px]" />
                                </span>
                            ) : null}
                            {!recalled && message?.sticker ? (
                                <span className="text-secondary dark:text-dark-secondary">
                                    <StickerSmileIcon className="w-[14px] h-[14px]" />
                                </span>
                            ) : null}
                            {!recalled && isHasFiles && !isImageList ? (
                                <span className="text-secondary dark:text-dark-secondary">
                                    <FileTextFillIcon className="w-[14px] h-[14px]" />
                                </span>
                            ) : null}
                            {!recalled && lastMessage.location ? (
                                <span className="text-secondary dark:text-dark-secondary">
                                    <LocationIcon className="w-[14px] h-[14px]" />
                                </span>
                            ) : null}
                            {message?.messages || recalled ? (
                                <ChatMessage
                                    status={message?.deleted}
                                    isMe
                                    className="line-clamp-1"
                                    isReply
                                    messages={message?.messages || []}
                                />
                            ) : null}
                            {subTitle && !recalled ? (
                                <span className="text-sm text-secondary dark:text-dark-secondary line-clamp-1">
                                    {subTitle}
                                </span>
                            ) : null}
                        </div>
                    )}
                    {chat.unseenMessages && chat._id !== activeChat?._id ? (
                        <div className="ml-auto w-fit px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-[1.6] text-danger bg-danger bg-opacity-20">
                            {getUnseenMessageNumber(chat.unseenMessages)}
                        </div>
                    ) : (
                        isPin && (
                            <div className="ml-auto w-[18px] h-[18px] flex justify-center items-center px-1.5 py-0.5 text-secondary dark:text-dark-secondary">
                                <PinFilledIcon className="w-[14px] h-[14px] flex-shrink-0" />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

ChatItem.propTypes = {
    active: PropTypes.bool,
    chat: PropTypes.object.isRequired,
};

export default ChatItem;
