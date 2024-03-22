import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '~/hooks';
import { classNames } from '~/utils';
import Portal from '../portal';
import Button from './Button';
import Footer from './Footer';
import Header from './Header';

const Modal = ({ children, show, className, containerClassName, onClickOutside = () => {} }) => {
    const [showDebounce, setShowDebounce] = useState(show);
    const [showAnimationDebounce, setShowAnimationDebounce] = useState(show);
    const ref = useRef();

    useOnClickOutside(ref, onClickOutside);

    useEffect(() => {
        if (show) {
            setShowDebounce(true);
            setTimeout(() => setShowAnimationDebounce(true), 10);
        } else {
            setTimeout(() => setShowDebounce(false), 300);
            setShowAnimationDebounce(false);
        }
    }, [show]);

    if (showDebounce)
        return (
            <Portal>
                <div
                    className={classNames(
                        'select-none fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-51 transition-all duration-300',
                        (showAnimationDebounce && 'opacity-100') || 'opacity-0',
                        containerClassName,
                    )}
                >
                    <div
                        ref={ref}
                        className={classNames(
                            'rounded-md border border-[rgba(0,0,0,.175)] w-[500px] bg-white dark:bg-dark-sidebar-sub-bg transition-all duration-300 mx-2',
                            (showAnimationDebounce && 'translate-y-0') || '-translate-y-10',
                            className,
                        )}
                    >
                        {children}
                    </div>
                </div>
            </Portal>
        );

    return null;
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    onClickOutside: PropTypes.func,
};

Modal.Header = Header;
Modal.Footer = Footer;
Modal.Button = Button;

export default Modal;
