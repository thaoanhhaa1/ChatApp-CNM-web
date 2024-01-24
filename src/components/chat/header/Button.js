import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const Button = forwardRef(({ icon, onClick = () => {} }, ref) => {
    const Icon = icon;

    return (
        <button
            onClick={onClick}
            ref={ref}
            className="w-10 h-10 flex justify-center items-center text-secondary dark:text-dark-secondary"
        >
            <Icon className="w-5 h-5" />
        </button>
    );
});

Button.propTypes = {
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

export default Button;
