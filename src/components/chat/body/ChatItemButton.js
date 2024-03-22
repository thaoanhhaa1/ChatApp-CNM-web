import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const ChatItemButton = forwardRef(({ children, onClick = () => {} }, ref) => {
    return (
        <span
            ref={ref}
            onClick={onClick}
            className="cursor-pointer w-7 h-7 flex justify-center items-center cursor-pointe dark:text-dark-secondary"
        >
            {children}
        </span>
    );
});

ChatItemButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default ChatItemButton;
