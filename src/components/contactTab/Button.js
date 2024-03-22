import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ Icon, title, description, primary, rounded, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer p-2.5 flex gap-3 items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-300 rounded-md"
        >
            {Icon && (
                <span
                    className={classNames(
                        'w-10 h-10 flex justify-center items-center',
                        rounded ? 'rounded-full' : 'rounded-md',
                        primary
                            ? 'bg-primary-color text-white'
                            : 'text-primary-color bg-[#e6ebf5] dark:bg-dark-sidebar-item-active-bg',
                    )}
                >
                    <Icon className="w-6 h-6" />
                </span>
            )}
            <div className="flex flex-col justify-center">
                <div className={classNames('text-sm font-medium', primary || 'text-primary-color')}>{title}</div>
                {description && <p className="mt-1 text-ss text-secondary dark:text-dark-secondary">{description}</p>}
            </div>
        </div>
    );
};

Button.propTypes = {
    Icon: PropTypes.func,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
