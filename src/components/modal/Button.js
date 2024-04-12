import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ loading = false, children, type = 'primary', disabled = false, ...props }) => {
    const styles = [];
    const passProps = {};

    if (type === 'text-primary') styles.push('text-primary-color hover:underline bg-transparent')
    else if (type === 'text-secondary') styles.push('bg-separate hover:brightness-90')
    else styles.push('text-white bg-primary-color hover:brightness-90');

    if (disabled) Object.keys(props).forEach((key) => key.startsWith('on') || (passProps.key = props[key]));
    else Object.assign(passProps, props);

    return (
        <button
            disabled={disabled}
            className={classNames(
                'relative flex justify-center items-center border border-transparent px-2 ex:px-3 sm:px-4 py-1 ex:py-1.5 sm:py-2 text-mm leading-normal rounded transition-all',
                disabled && 'opacity-60 cursor-default',
                ...styles,
            )}
            {...passProps}
        >
            <span className={classNames(loading ? 'opacity-0' : 'opacity-100')}>{children}</span>
            {loading && (
                <span className="absolute w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['primary', 'text-primary']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
};

export default Button;
