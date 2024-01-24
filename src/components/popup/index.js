import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { classNames } from '~/utils';
import Item from './Item';

const Popup = ({ data, children, ...props }) => {
    const [instance, setInstance] = useState();

    const handleHidden = () => {
        instance && instance.hide();
        setInstance();
    };

    const content = (
        <div className={classNames('-mx-2 -my-1')}>
            {data.map((item, index) => (
                <Popup.Item handleHiddenPopup={handleHidden} key={index} {...item}>
                    {item.title}
                </Popup.Item>
            ))}
        </div>
    );

    return (
        <div>
            <Tippy
                className="min-w-[160px] py-2 bg-white dark:bg-dark-popup-bg shadow-popup rounded"
                content={content}
                arrow={false}
                trigger="click"
                interactive
                offset={[0, 0]}
                onShown={setInstance}
                role="popup"
                {...props}
            >
                {children}
            </Tippy>
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
