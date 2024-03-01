import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLayout } from '~/context';
import { setActive } from '~/features/chats/chatsSlice';
import { classNames, getUnseenMessageNumber } from '~/utils';
import Avatar from '../avatar';
import Message from '../message';
import Typing from '../typing';

const ChatItem = ({ chat, active }) => {
    const { setShowChat } = useLayout();
    const dispatch = useDispatch();

    const message = chat.messages.at(-1);

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
            <Avatar status={chat.user.status} src={chat.user.avatar} />
            <div className="flex-1 flex justify-between">
                <div className="">
                    <h5 className="text-mm font-semibold mb-1 line-clamp-1">{chat.user.name}</h5>
                    {(chat.typing && <Typing />) || (
                        <Message isMe className="line-clamp-1" isReply messages={message.messages} />
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-ex text-secondary dark:text-dark-secondary text-nowrap">02:50 PM</span>
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
    chat: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        }).isRequired,
        typing: PropTypes.bool.isRequired,
    }).isRequired,
};

export default ChatItem;
