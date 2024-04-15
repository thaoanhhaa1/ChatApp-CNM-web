import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classNames } from '~/utils';

const Button = forwardRef(({ Icon, className, iconClassName, onClick = () => {} }, ref) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            className={classNames('p-1 text-secondary dark:text-dark-secondary', className)}
        >
            <Icon className={classNames('w-4 h-4', iconClassName)} />
        </button>
    );
});

Button.propTypes = {
    Icon: PropTypes.func.isRequired,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
