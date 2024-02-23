import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Action = ({ Icon, children, disabled = false, onClick = () => {} }) => {
    const handleClick = () => disabled || onClick();

    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={classNames(
                'px-4 py-3 flex items-center gap-2 w-full transition-all duration-300 text-sm leading-normal',
                disabled ? 'opacity-60 cursor-default' : 'cursor-pointer hover:bg-[#f3f5f6]',
            )}
        >
            {Icon && (
                <span className="text-secondary dark:text-dark-secondary">
                    <Icon className="w-5 h-5" />
                </span>
            )}
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
