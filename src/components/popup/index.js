import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from '~/utils';
import Item from './Item';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const Popup = ({ data, children, ...props }) => {
    const tipRef = useRef();
    const [instance, setInstance] = useState();

    const handleHidden = useCallback(() => {
        instance && instance.hide();
        setInstance();
    }, [instance]);

    const content = (
        <div className={classNames('-mx-2 -my-1')}>
            {data.map((item, index) => (
                <Popup.Item handleHiddenPopup={handleHidden} key={index} {...item}>
                    {item.title}
                </Popup.Item>
            ))}
        </div>
    );

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
        };
        const ref = tipRef.current;
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            entry.isIntersecting || handleHidden();
        }, options);

        if (ref) observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [handleHidden, tipRef]);

    return (
        <div className="flex">
            <Tippy
                ref={tipRef}
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

export default withErrorBoundary(Popup, {
    fallback: null,
    onError: (error, info) => {
        toast.error('Popup::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
