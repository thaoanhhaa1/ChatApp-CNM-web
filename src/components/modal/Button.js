import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ children, type = 'primary', onClick = () => {} }) => {
    const styles = [];

    if (type === 'text-primary') styles.push('text-primary-color bg-white hover:underline dark:bg-dark-sidebar-sub-bg');
    else styles.push('text-white bg-primary-color hover:brightness-90');

    return (
        <button
            onClick={onClick}
            className={classNames(
                'border border-transparent px-4 py-2 text-mm leading-normal rounded transition-all',
                ...styles,
            )}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default Button;
