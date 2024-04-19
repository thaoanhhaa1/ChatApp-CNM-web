import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { MoreFillIcon, PinFilledIcon } from '~/assets';
import { useLayout } from '~/context';
import { setActive, togglePin } from '~/features/chats/chatsSlice';
import conversationServices from '~/services/conversation.service';
import {
    classNames,
    convertToAvatarUrlList,
    getNameConversation,
    getTimeChat,
    getUnseenMessageNumber,
    isPinConversation,
} from '~/utils';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';
import ChatItemMessage from '../chatItemMessage';
import Popup from '../popup';
import Typing from '../typing';

const ChatItem = ({ chat, active }) => {
    const { t } = useTranslation();
    const { setShowChat } = useLayout();
    const { user } = useSelector((state) => state.user);
    const { active: activeChat } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const receiver = useMemo(() => (chat.isGroup ? {} : chat.users.find((u) => u._id !== user._id)), [chat, user]);
    const isPin = isPinConversation(chat, user);
    const isTyping = chat.users.some((u) => u.typing);
    const conversationName = getNameConversation(chat, user._id);
    const avatars = useMemo(() => convertToAvatarUrlList(chat.users), [chat.users]);

    const togglePinConversation = useCallback(() => {
        conversationServices.togglePinConversation(chat._id).then();
        dispatch(togglePin({ conversationId: chat._id, userId: user._id }));
    }, [chat._id, dispatch, user._id]);

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
            {chat.picture ? <Avatar status={receiver.status} src={chat.picture} /> : <AvatarGroup avatars={avatars} />}
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
                    {(isTyping && <Typing />) || <ChatItemMessage chat={chat} />}
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
