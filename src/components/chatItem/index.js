import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MoreFillIcon, PinFilledIcon } from '~/assets';
import { useLayout } from '~/context';
import { setActive, togglePin } from '~/features/chats/chatsSlice';
import { useBoolean } from '~/hooks';
import conversationServices from '~/services/conversation.service';
import {
    classNames,
    getNameConversation,
    getOtherUserInIndividual,
    getTimeChat,
    getUnseenMessageNumber,
    isPinConversation,
} from '~/utils';
import ChatItemMessage from '../chatItemMessage';
import ConversationAvatar from '../conversationAvatar';
import Popup from '../popup';
import Typing from '../typing';
import AddToGroups from './AddToGroups';
import DeleteChatItem from './DeleteChatItem';

const ChatItem = ({ chat, active }) => {
    const { t } = useTranslation();
    const { setShowChat } = useLayout();
    const { user } = useSelector((state) => state.user);
    const { active: activeChat } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const isPin = isPinConversation(chat, user);
    const isTyping = chat.users.some((u) => u.typing);
    const conversationName = getNameConversation(chat, user._id);
    const {
        value: showDeleteConversation,
        setFalse: handleHideDeleteConversation,
        setTrue: handleShowDeleteConversation,
    } = useBoolean(false);
    const {
        value: showAddToGroups,
        setFalse: handleHideAddToGroups,
        setTrue: handleShowAddToGroups,
    } = useBoolean(false);
    const otherUser = !chat.isGroup && getOtherUserInIndividual(chat.users, user._id);

    const togglePinConversation = useCallback(async () => {
        const index = chat.pinBy.findIndex((item) => item === user._id);

        await toast.promise(conversationServices.togglePinConversation(chat._id), {
            pending: t(`conversation.${index >= 0 ? 'unpinConversation' : 'pinConversation'}.pending`),
            success: t(`conversation.${index >= 0 ? 'unpinConversation' : 'pinConversation'}.success`),
            error: t(`conversation.${index >= 0 ? 'unpinConversation' : 'pinConversation'}.error`),
        });

        dispatch(togglePin({ conversationId: chat._id, userId: user._id }));
    }, [chat._id, chat.pinBy, dispatch, t, user._id]);

    const handleClickDeleteConversation = useCallback(
        (e) => {
            e.stopPropagation();

            handleShowDeleteConversation();
        },
        [handleShowDeleteConversation],
    );

    const more = useMemo(() => {
        const more = [
            // TODO
            // {
            //     title: t('chats.more.mark-as-unread'),
            //     separate: true,
            // },
            {
                title: t('chats.more.delete-conversation'),
                // separate: true,
                onClick: handleClickDeleteConversation,
                type: 'danger',
            },
            // {
            //     title: t('chats.more.report'),
            // },
        ];

        if (!chat.isGroup)
            more.unshift({
                title: t('chats.more.add-to-group'),
                onClick: handleShowAddToGroups,
                separate: true,
            });

        if (isPin)
            more.unshift({
                title: t('chats.more.unpin'),
                separate: chat.isGroup,
                onClick: togglePinConversation,
            });
        else
            more.unshift({
                title: t('chats.more.pin'),
                separate: chat.isGroup,
                onClick: togglePinConversation,
            });

        return more;
    }, [chat.isGroup, handleClickDeleteConversation, handleShowAddToGroups, isPin, t, togglePinConversation]);

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
            <ConversationAvatar conversation={chat} />
            <div className="flex-1 flex flex-col gap-1">
                <div className="mb-1 flex gap-1 items-center justify-between">
                    <h5 className="text-mm font-semibold line-clamp-1">{conversationName}</h5>
                    {message ? (
                        <span className="text-ex text-secondary dark:text-dark-secondary text-nowrap group-hover/chat:hidden">
                            {getTimeChat(message.updatedAt || new Date(message.timeSend))}
                        </span>
                    ) : null}
                    <div onClick={(e) => e.stopPropagation()} className="group-hover/chat:block hidden">
                        <Popup data={more}>
                            <span className="hover:bg-black hover:bg-opacity-5 transition-colors duration-150 flex w-[18px] h-[18px] justify-center items-center rounded">
                                <MoreFillIcon className="w-[14px] h-[14px]" />
                            </span>
                        </Popup>
                    </div>
                </div>
                <div className="flex gap-1 items-center justify-between">
                    {(isTyping && <Typing />) || <ChatItemMessage chat={chat} />}
                    {chat.unreadMessageCount && chat._id !== activeChat?._id ? (
                        <div className="ml-auto w-fit px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-[1.6] text-danger bg-danger bg-opacity-20">
                            {getUnseenMessageNumber(chat.unreadMessageCount)}
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
            <DeleteChatItem
                conversationId={chat._id}
                show={showDeleteConversation}
                onClickOutside={handleHideDeleteConversation}
            />
            {otherUser && (
                <AddToGroups userId={otherUser._id} show={showAddToGroups} onClickOutside={handleHideAddToGroups} />
            )}
        </div>
    );
};

ChatItem.propTypes = {
    active: PropTypes.bool,
    chat: PropTypes.object.isRequired,
};

export default ChatItem;
