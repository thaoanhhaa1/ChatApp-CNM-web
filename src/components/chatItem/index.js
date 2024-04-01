import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageFillIcon, StickerSmileIcon } from '~/assets';
import { useLayout } from '~/context';
import { setActive } from '~/features/chats/chatsSlice';
import { classNames, getTimeChat, getUnseenMessageNumber } from '~/utils';
import Avatar from '../avatar';
import Message from '../message';
import Typing from '../typing';

const ChatItem = ({ chat, active }) => {
    const { setShowChat } = useLayout();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const receiver = useMemo(() => (chat.isGroup ? {} : chat.users.find((u) => u._id !== user._id)), [chat, user]);

    const message = chat.lastMessage;

    const handleClickChat = () => {
        setShowChat(true);
        dispatch(setActive(chat));
    };

    return (
        <div
            className={classNames(
                'rounded cursor-pointer px-2.5 dl:px-5 py-1.5 dl:py-4 flex items-center gap-2.5 dl:gap-4 transition-all duration-400 hover:bg-light dark:hover:bg-dark-separate',
                active && 'bg-light dark:bg-dark-separate',
            )}
            onClick={handleClickChat}
        >
            <Avatar status={receiver.status} src={chat.picture} />
            <div className="flex-1 flex flex-col gap-1">
                <div className="flex gap-1 items-center justify-between">
                    <h5 className="text-mm font-semibold mb-1 line-clamp-1">{chat.name}</h5>
                    <span className="text-ex text-secondary dark:text-dark-secondary text-nowrap">
                        {getTimeChat(message.updatedAt || new Date(message.timeSend))}
                    </span>
                </div>
                <div className="flex gap-1 items-center justify-between">
                    {(chat.typing && <Typing />) || (
                        <div className="flex gap-1 items-center">
                            {message?.images?.length ? (
                                <span className="text-secondary dark:text-dark-secondary">
                                    <ImageFillIcon className="w-[14px] h-[14px]" />
                                </span>
                            ) : null}
                            {message.sticker ? (
                                <>
                                    <span className="text-secondary dark:text-dark-secondary">
                                        <StickerSmileIcon className="w-[14px] h-[14px]" />
                                    </span>
                                    <span className="text-sm text-secondary dark:text-dark-secondary">Sticker</span>
                                </>
                            ) : (
                                <Message isMe className="line-clamp-1" isReply messages={message.messages || []} />
                            )}
                        </div>
                    )}
                    {chat.unseenMessages && (
                        <div className="ml-auto w-fit px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-[1.6] text-danger bg-danger bg-opacity-20">
                            {getUnseenMessageNumber(chat.unseenMessages)}
                        </div>
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
