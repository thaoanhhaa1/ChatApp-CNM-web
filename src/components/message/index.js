import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Message = ({ large, messages, isMe, className, isReply }) => {
    const handleClickMessage = (message) => {
        if (message.type === 'text' || isReply) return;

        console.log(message);
    };

    return (
        <p
            className={classNames(
                isMe
                    ? isReply
                        ? 'text-secondary dark:text-dark-secondary'
                        : 'text-primary dark:text-dark-primary'
                    : 'text-white',
                (large && 'text-mm') || 'text-sm',
                className,
            )}
        >
            {messages.map((message, index) => (
                <span
                    key={index}
                    onClick={() => handleClickMessage(message)}
                    className={classNames(message.type === 'tag' && !isReply && 'text-[#0068ff] cursor-pointer')}
                >
                    {message.type === 'tag' && '@'}
                    {message.content}
                </span>
            ))}
        </p>
    );
};

Message.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            id: PropTypes.string,
        }).isRequired,
    ).isRequired,
    isMe: PropTypes.bool,
    className: PropTypes.string,
    large: PropTypes.bool,
    isReply: PropTypes.bool,
};

export default Message;
