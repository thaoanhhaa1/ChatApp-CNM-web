import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DeleteMessageStatus } from '~/constants';
import { classNames } from '~/utils';

const ChatMessage = ({ status = DeleteMessageStatus.NO_DELETE, large, messages, isMe, className, isReply }) => {
    const { t } = useTranslation();

    const handleClickMessage = (message) => {
        if (message.type === 'text' || isReply) return;
    };

    if (!messages.length) return null;

    return (
        <p
            className={classNames(
                'flex gap-1',
                isMe
                    ? isReply || status === DeleteMessageStatus.RECALL
                        ? 'text-secondary dark:text-dark-secondary'
                        : 'text-primary dark:text-dark-primary'
                    : 'text-white',
                (large && 'text-mm') || 'text-sm',
                className,
            )}
        >
            {status === DeleteMessageStatus.RECALL && <span>{t('chat.message-recalled')}</span>}
            {status !== DeleteMessageStatus.RECALL
                ? messages.map((message, index) => (
                      <span
                          key={index}
                          onClick={() => handleClickMessage(message)}
                          className={classNames(message.type === 'tag' && !isReply && 'text-[#0068ff] cursor-pointer')}
                      >
                          {message.type === 'tag' && '@'}
                          {message.content}
                      </span>
                  ))
                : null}
        </p>
    );
};

ChatMessage.propTypes = {
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
    status: PropTypes.string,
};

export default ChatMessage;
