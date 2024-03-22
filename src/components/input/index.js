import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Input = ({
    Icon,
    outline,
    rounded,
    placeholder = '',
    className = '',
    iconClassName = '',
    containerClassName = '',
    onChangeText = () => {},
    onChange = () => {},
    ...props
}) => {
    const handleChange = (e) => {
        onChange(e);
        onChangeText(e.target.value);
    };

    return (
        <div
            className={classNames(
                'border flex items-center overflow-hidden transition-all',
                outline
                    ? 'border-separate dark:border-dark-separate dark:focus-within:border-dark-sidebar-item-color bg-white dark:bg-dark-sidebar-sub-bg focus-within:border-input overflow-hidden'
                    : 'border-transparent bg-input-bg dark:bg-dark-input-bg',
                rounded ? 'rounded-full' : 'rounded',
                containerClassName,
            )}
        >
            {Icon && (
                <span className={classNames('pl-2 sm:pl-4 text-secondary dark:text-dark-secondary', iconClassName)}>
                    <Icon className="w-full h-full" />
                </span>
            )}
            <input
                placeholder={placeholder}
                className={classNames(
                    'flex-1 px-2 sm:px-4 py-1 sm:py-2 outline-none text-sm leading-normal placeholder:text-secondary dark:placeholder:text-dark-secondary text-input dark:text-dark-primary',
                    outline ? 'bg-white dark:bg-dark-sidebar-sub-bg' : 'bg-input-bg dark:bg-dark-input-bg',
                    className,
                )}
                {...props}
                onChange={handleChange}
            />
        </div>
    );
};

Input.propTypes = {
    Icon: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    iconClassName: PropTypes.string,
    outline: PropTypes.bool,
    onChangeText: PropTypes.func,
    onChange: PropTypes.func,
    rounded: PropTypes.bool,
};

export default Input;
