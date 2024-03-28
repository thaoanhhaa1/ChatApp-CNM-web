import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ className, hidden, children, active, ...props }) => {
    return (
        <button
            hidden={hidden}
            className={classNames(
                'z-1 text-secondary dark:text-dark-secondary flex w-6 flex-shrink-0 justify-center items-center shadow-[0_0_10px_0_#d6dbe1] dark:shadow-[0_0_10px_0_#3d3f40]',
                className,
                active && 'text-[#0068ff]',
                hidden && 'hidden',
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
    hidden: PropTypes.bool,
    active: PropTypes.bool,
};

export default Button;
