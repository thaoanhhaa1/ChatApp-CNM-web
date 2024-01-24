import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ children, className, onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-12 h-12 rounded-full flex justify-center items-center text-white transition-all duration-150 hover:brightness-90',
                className,
            )}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Button;
