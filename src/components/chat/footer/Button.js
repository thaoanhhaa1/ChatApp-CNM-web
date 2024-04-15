import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classNames } from '~/utils';

const Button = forwardRef(
    ({ type = 'text-primary', icon, className, disabled = false, onClick = () => {}, ...props }, ref) => {
        const Icon = icon;

        return (
            <button
                disabled={disabled}
                ref={ref}
                onClick={onClick}
                className={classNames(
                    'rounded-md flex-shrink-0 w-9 h-9 flex justify-center items-center transition-all',
                    type === 'text-primary'
                        ? 'text-primary-color bg-white dark:bg-dark'
                        : 'text-white bg-primary-color hover:brightness-90',
                    disabled && 'cursor-default opacity-50',
                    className,
                )}
                {...props}
            >
                <Icon className="w-5 h-5" />
            </button>
        );
    },
);

Button.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
