import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classNames } from '~/utils';

const Button = forwardRef(({ icon, className, onClick = () => {} }, ref) => {
    const Icon = icon;

    return (
        <button
            onClick={onClick}
            ref={ref}
            className={classNames(
                'w-10 h-10 flex justify-center items-center text-secondary dark:text-dark-secondary',
                className,
            )}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
});

Button.propTypes = {
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
