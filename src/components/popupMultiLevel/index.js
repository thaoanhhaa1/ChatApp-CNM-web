import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { setHeight, setUpdateHeightPopup } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { classNames } from '../../utils';

const PopupMultiLevel = ({ children, onClose = () => {} }) => {
    const { subs, height } = useSelector((state) => state.popupMultiLevel);
    const Sub = useMemo(() => subs.at(-1), [subs]);
    const subRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        function updateHeight() {
            if (!subs.length || !subRef.current) {
                dispatch(setHeight(0));
                return;
            }

            const element = subRef.current;

            dispatch(setHeight(element.offsetHeight));
        }

        updateHeight();
        dispatch(setUpdateHeightPopup(updateHeight));
    }, [dispatch, subs]);

    return (
        <div className="w-full rounded-2.5 overflow-hidden">
            <AnimateHeight
                duration={200}
                height={height || 'auto'}
                className="relative bg-white dark:bg-[#242526] cursor-default overflow-hidden"
            >
                <div
                    className={classNames(
                        'max-h-[min(600px,_80vh)] overflow-y-auto transition-transform duration-200',
                        subs.length ? '-translate-x-full' : 'translate-x-0',
                    )}
                >
                    <div className="relative">{children}</div>
                </div>
                <div
                    className={classNames(
                        'absolute max-h-[85vh] overflow-y-auto top-0 left-full w-full transition-transform duration-200',
                        subs.length ? '-translate-x-full' : 'translate-x-0',
                    )}
                >
                    {Sub && (
                        <div ref={subRef}>
                            <Sub onClose={onClose} />
                        </div>
                    )}
                </div>
            </AnimateHeight>
        </div>
    );
};

PopupMultiLevel.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default PopupMultiLevel;
