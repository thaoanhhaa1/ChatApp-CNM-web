import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ children, type = 'primary', disabled = false, ...props }) => {
    const styles = [];
    const passProps = {};

    if (type === 'text-primary') styles.push('text-primary-color hover:underline bg-transparent');
    else styles.push('text-white bg-primary-color hover:brightness-90');

    if (disabled) Object.keys(props).forEach((key) => key.startsWith('on') || (passProps.key = props[key]));
    else Object.assign(passProps, props);

    return (
        <button
            disabled={disabled}
            className={classNames(
                'border border-transparent px-2 ex:px-3 sm:px-4 py-1 ex:py-1.5 sm:py-2 text-mm leading-normal rounded transition-all',
                disabled && 'opacity-60 cursor-default',
                ...styles,
            )}
            {...passProps}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['primary', 'text-primary']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
