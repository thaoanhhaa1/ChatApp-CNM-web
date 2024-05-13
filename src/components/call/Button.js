import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ children, className, disabled, onClick = () => {}, ...props }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={classNames(
                'w-12 h-12 rounded-full flex justify-center items-center text-white transition-all duration-150 hover:brightness-90',
                disabled && 'opacity-60',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
