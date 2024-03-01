import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import Message from '../message';

const ReplyMessage = ({ message, isMe, onClick = () => {} }) => {
    const image = message.images?.[0];

    const handleClick = () => onClick(message);

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'flex gap-2 items-center px-3 py-2.5 rounded-md cursor-pointer',
                isMe ? 'bg-white dark:bg-dark-sidebar-item-active-bg' : 'bg-primary-color bg-opacity-50',
            )}
        >
            <div className="w-0.5 h-10 bg-primary-color" />
            {image && <img alt="" src={image} className="w-9 h-9 object-cover" />}
            <div className="flex-1">
                <div className="text-ss font-medium line-clamp-1">{message.name}</div>
                <Message messages={message.messages} isMe={isMe} className="line-clamp-1" isReply />
            </div>
        </div>
    );
};

ReplyMessage.propTypes = {
    message: PropTypes.shape({
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    isMe: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
};

export default ReplyMessage;
