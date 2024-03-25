import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { classNames } from '~/utils';

const Button = forwardRef(({ icon, to = '', className = '', children, onClick = () => {} }, ref) => {
    const Icon = icon;
    let Comp = 'button';
    let classes = classNames(
        'w-12 h-12 dl:w-[56px] dl:h-[56px] flex justify-center items-center rounded-lg text-sidebar-item-color dark:text-dark-sidebar-item-color active:text-sidebar-item-active-color active:bg-sidebar-item-active-bg dark:active:bg-dark-sidebar-item-active-bg',
        className,
    );

    if (to) {
        Comp = NavLink;
        classes = (props) =>
            classNames(
                'w-12 h-12 dl:w-[56px] dl:h-[56px] flex flex-col justify-center items-center rounded-lg',
                (to &&
                    props?.isActive &&
                    'text-sidebar-item-active-color bg-sidebar-item-active-bg dark:bg-dark-sidebar-item-active-bg') ||
                    'text-sidebar-item-color dark:text-dark-sidebar-item-color',
                className,
            );
    }

    return (
        <Comp ref={ref} to={to} className={classes} onClick={onClick}>
            {icon && <Icon className="w-5 h-5 dl:w-6 dl:h-6" />}
            <span className="text-xs dl:hidden">{children}</span>
        </Comp>
    );
});

Button.propTypes = {
    icon: PropTypes.func,
    to: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
