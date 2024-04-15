import PropTypes from 'prop-types';

const MessageSeparate = ({ children }) => {
    return (
        <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-separate dark:border-dark-separate flex-1" />
            <span className="py-1.5 px-3 text-ss bg-separate dark:bg-dark-separate z-1 rounded dark:text-dark-sidebar-item-color">
                {children}
            </span>
        </div>
    );
};

MessageSeparate.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MessageSeparate;
