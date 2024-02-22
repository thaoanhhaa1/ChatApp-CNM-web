import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Action = ({ Icon, children, disabled = false, onClick = () => {} }) => {
    const handleClick = () => disabled || onClick();

    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={classNames(
                'px-4 py-3 flex items-center gap-2 w-full transition-all duration-300',
                disabled ? 'opacity-80 cursor-default' : 'cursor-pointer hover:bg-[#f3f5f6]',
            )}
        >
            {Icon && <Icon className="w-5 h-5 text-secondary dark:text-dark-secondary" />}
            {children}
        </button>
    );
};

Action.propTypes = {
    Icon: PropTypes.func,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

export default Action;
