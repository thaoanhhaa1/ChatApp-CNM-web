import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Input = ({ Icon, placeholder = '', className = '', containerClassName = '', ...props }) => {
    return (
        <div
            className={classNames(
                'flex items-center bg-input-bg dark:bg-dark-input-bg rounded-1.6 overflow-hidden',
                containerClassName,
            )}
        >
            {Icon && (
                <span className="pl-2 sm:pl-4 text-secondary dark:text-dark-secondary">
                    <Icon className="w-[18px] h-[18px]" />
                </span>
            )}
            <input
                placeholder={placeholder}
                className={classNames(
                    'bg-input-bg dark:bg-dark-input-bg flex-1 px-2 sm:px-4 py-1 sm:py-2 outline-none text-sm leading-normal placeholder:text-secondary dark:placeholder:text-dark-secondary text-primary dark:text-dark-primary',
                    className,
                )}
                {...props}
            />
        </div>
    );
};

Input.propTypes = {
    Icon: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
};

export default Input;
