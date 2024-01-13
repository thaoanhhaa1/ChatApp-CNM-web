import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Item = ({ url, icon, children, active, separate }) => {
    const Icon = icon;

    return (
        <>
            <div
                className={classNames(
                    'cursor-pointer flex justify-between items-center px-6 py-1.5 text-secondary transition-all hover:bg-popup-item-hover-bg',
                    active && '!bg-popup-item-active-bg !text-white',
                )}
            >
                <div className="flex gap-2 items-center">
                    {url && <img className="h-3 object-cover" src={url} alt={children} />}
                    <span className="text-mm leading-5">{children}</span>
                </div>
                {icon && <Icon className="w-[15px] h-[15px]" />}
            </div>
            {separate && <div className="my-2 border-t border-separate" />}
        </>
    );
};

Item.propTypes = {
    url: PropTypes.string,
    icon: PropTypes.func,
    children: PropTypes.string.isRequired,
    active: PropTypes.bool,
    separate: PropTypes.bool,
};

export default Item;
