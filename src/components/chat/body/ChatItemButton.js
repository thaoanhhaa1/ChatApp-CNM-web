import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const ChatItemButton = forwardRef(({ children }, ref) => {
    return (
        <span
            ref={ref}
            className="cursor-pointer w-7 h-7 flex justify-center items-center cursor-pointe dark:text-dark-secondary"
        >
            {children}
        </span>
    );
});

ChatItemButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ChatItemButton;
