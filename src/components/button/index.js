import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { classNames } from '~/utils';

function Button({
    to,
    href,
    primary = false,
    outline = false,
    rounded = false,
    text = false,
    small = false,
    large = false,
    disabled = false,
    children,
    className,
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
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on')) delete props[key];
        });
    }

    return (
        <Comp
            className={classNames(
                'relative inline-flex items-center min-w-[100px] gap-2 border border-transparent cursor-pointer select-none disabled:opacity-50',
                (small && 'px-2 py-1 rounded text-sm leading-normal') || 'px-4 py-2 rounded-md text-mm leading-normal',
                primary && 'bg-primary-color text-white',
                align === 'center' && 'justify-center',
                align === 'left' && 'justify-start',
                align === 'right' && 'justify-end',
                disabled && 'opacity-50',
                className
            )}
            {...props}
            {...passProp}
        >
            {LeftIcon && <LeftIcon className={classNames(loading && 'opacity-0')} />}
            <span className={classNames(loading && 'opacity-0')}>{children}</span>
            {RightIcon && <RightIcon className={classNames(loading && 'opacity-0')} />}
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
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    text: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    loading: PropTypes.bool,
    LeftIcon: PropTypes.node,
    RightIcon: PropTypes.node,
    align: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
