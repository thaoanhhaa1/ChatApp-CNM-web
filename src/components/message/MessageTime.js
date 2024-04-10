import PropTypes from 'prop-types';
import { ClockIcon } from '~/assets';
import { useMessage } from '~/context';
import { classNames, getTimeChat } from '~/utils';

const MessageTime = ({ time }) => {
    const { isMe } = useMessage();

    return (
        <div
            className={classNames(
                'flex items-center text-xs',
                isMe ? 'text-secondary dark:text-dark-secondary' : 'text-white text-opacity-50 justify-end',
            )}
        >
            <ClockIcon className="mr-1" />
            <span>{getTimeChat(time)}</span>
        </div>
    );
};

MessageTime.propTypes = {
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default MessageTime;
