import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { classNames } from '~/utils';

function Button({
    to,
    href,
    primary = false,
    secondary = false,
    danger = false,
    outline = false,
    rounded = false,
    text = false,
    small = false,
    large = false,
    disabled = false,
    children,
    className,
    iconClassName,
    align = 'center',
    loading = false,
    LeftIcon,
    RightIcon,
    onClick,
    ...passProp
}) {
    let Comp = 'button';

    if (to) Comp = Link;
    if (href) Comp = 'a';

    const props = {
        to,
        href,
        onClick,
        ...passProp,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on')) delete props[key];
        });
    }

    return (
        <Comp
            className={classNames(
                'relative inline-flex items-center min-w-[100px] gap-2 border cursor-pointer select-none disabled:opacity-50 transition-all duration-300',
                (small && 'px-2 py-1 text-sm leading-normal') ||
                    'px-2 ex:px-3 sm:px-4 py-1 ex:py-1.5 sm:py-2 text-mm leading-normal',
                !outline && primary && 'bg-primary-color text-white',
                !outline && secondary && 'bg-[#f0eff5] dark:bg-[#36404a] text-[#7a7f9a] dark:text-[#abb4d2]',
                !outline && danger && 'bg-danger bg-opacity-20 hover:bg-danger hover:bg-opacity-25 text-danger',
                text && 'hover:underline hover:text-hoverPurple',
                align === 'center' && 'justify-center',
                align === 'left' && 'justify-start',
                align === 'right' && 'justify-end',
                disabled && 'opacity-50',
                (outline && 'border-primary-color text-primary-color hover:bg-primary-color hover:bg-opacity-10') ||
                    'border-transparent',
                rounded && 'rounded-full',
                !rounded && ((small && 'rounded') || 'rounded-md'),
                primary ||
                    secondary ||
                    outline ||
                    disabled ||
                    text ||
                    'hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5',
                className,
            )}
            {...props}
        >
            {LeftIcon && <LeftIcon className={classNames('flex-shrink-0', loading && 'opacity-0', iconClassName)} />}
            <span className={classNames(loading && 'opacity-0')}>{children}</span>
            {RightIcon && <RightIcon className={classNames('flex-shrink-0', loading && 'opacity-0', iconClassName)} />}
            <span
                className={classNames(
                    'absolute block -my-2 w-6 h-6 border-4 rounded-full border-white border-t-transparent animate-spin',
                    loading || 'opacity-0',
                )}
            />
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    danger: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    text: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    loading: PropTypes.bool,
    LeftIcon: PropTypes.func,
    RightIcon: PropTypes.func,
    align: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
