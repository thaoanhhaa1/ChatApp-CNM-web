import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '~/hooks';
import { classNames } from '~/utils';
import Item from './Item';

const Popup = ({ data, children, className = '', popupClassName = 'top-full left-0' }) => {
    const [showPopup, setShowPopup] = useState(false);
    const ref = useRef();

    const handleClick = () => setShowPopup(!showPopup);

    useOnClickOutside(ref, () => setShowPopup(false));

    return (
        <div ref={ref} className={classNames('relative', className)}>
            <div onClick={handleClick}>{children}</div>

            {showPopup && (
                <div
                    className={classNames('min-w-[160px] py-2 bg-white shadow-popup rounded absolute', popupClassName)}
                >
                    {data.map((item, index) => (
                        <Popup.Item key={index} {...item}>
                            {item.title}
                        </Popup.Item>
                    ))}
                </div>
            )}
        </div>
    );
};

Popup.propTypes = {
    popupClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    data: PropTypes.array.isRequired,
};

Popup.Item = Item;

export default Popup;
