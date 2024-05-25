import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import Avatar from '~/components/avatar';
import Typing from '~/components/typing';

const MessageTyping = ({ chat }) => {
    return (
        <div>
            <div className="max-w-[75%] flex">
                <Avatar containerClassName="flex-shrink-0 self-end" src={chat.avatar} />
                <div className="ml-2 sm:ml-4 mr-1">
                    <div className="flex flex-col gap-1 px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg rounded-r-lg bg-primary-color bg-opacity-60">
                        <Typing isChat />
                    </div>
                    <div className="border-5 w-0 border-primary-color border-opacity-60 border-r-transparent border-b-transparent" />
                    <div className="text-sm font-medium text-primary dark:text-[rgb(166,176,207)]">{chat.name}</div>
                </div>
            </div>
        </div>
    );
};

MessageTyping.propTypes = {
    chat: PropTypes.object.isRequired,
};

export default withErrorBoundary(MessageTyping, {
    fallback: null,
    onError: (error, info) => {
        toast.error('MessageTyping::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
