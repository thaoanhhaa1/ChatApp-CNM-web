import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { classNames } from '~/utils';

const Item = ({
    url,
    icon,
    children,
    active,
    separate,
    className,
    handleHiddenPopup = () => {},
    onClick = () => {},
}) => {
    const Icon = icon;

    const handleClick = () => {
        handleHiddenPopup();
        onClick();
    };

    return (
        <>
            <div
                className={classNames(
                    'select-none min-w-[158px] cursor-pointer flex justify-between items-center gap-2 px-3 sm:px-6 py-1 sm:py-1.5 text-secondary dark:text-dark-sidebar-item-color transition-all hover:bg-popup-item-hover-bg dark:hover:bg-dark-sidebar-bg',
                    active && '!bg-popup-item-active-bg !text-white',
                    className,
                )}
                onClick={handleClick}
            >
                <div className="flex gap-2 items-center">
                    {url && <LazyLoadImage className="h-3 object-cover" src={url} alt={children} />}
                    <span className="text-mm leading-5">{children}</span>
                </div>
                {icon && <Icon className="w-[15px] h-[15px]" />}
            </div>
            {separate && <div className="my-2 border-t border-separate dark:border-dark-separate" />}
        </>
    );
};

Item.propTypes = {
    url: PropTypes.string,
    icon: PropTypes.func,
    children: PropTypes.string.isRequired,
    active: PropTypes.bool,
    separate: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    handleHiddenPopup: PropTypes.func,
};

export default Item;
