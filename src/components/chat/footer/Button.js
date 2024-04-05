import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classNames } from '~/utils';

const Button = forwardRef(({ type = 'text-primary', icon, className, onClick = () => {}, ...props }, ref) => {
    const Icon = icon;

    return (
        <button
            ref={ref}
            onClick={onClick}
            className={classNames(
                'rounded-md flex-shrink-0 w-9 h-9 flex justify-center items-center transition-all',
                type === 'text-primary'
                    ? 'text-primary-color bg-white dark:bg-dark'
                    : 'text-white bg-primary-color hover:brightness-90',
                className,
            )}
            {...props}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
});

Button.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.func.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
