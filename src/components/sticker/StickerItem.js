import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useImageSize } from 'react-image-size';
import { toast } from 'react-toastify';
import { useBoolean } from '~/hooks';
import { classNames, loadImage } from '~/utils';

const StickerItem = ({ count = 0, className, url, onClick = () => {} }) => {
    const ref = useRef();
    const [dimensions] = useImageSize(url);
    const { value, setFalse, setTrue } = useBoolean(false);
    const length = useMemo(() => (dimensions ? dimensions.width / dimensions.height : 0), [dimensions]);
    const [countEffect, setCountEffect] = useState(count);
    const [loadedImage, setLoadedImage] = useState(false);
    const [backgroundSize, setBackgroundSize] = useState('cover');

    const handleMouseLeave = () => {
        setFalse();
        setCountEffect(false);
    };

    useEffect(() => {
        loadImage(url)
            .then(() => setLoadedImage(true))
            .catch((error) => console.error(error));
    }, [url]);

    useEffect(() => {
        const element = ref.current;

        if (!element || !dimensions) return () => {};

        const elementWith = element.clientWidth;
        const { width, height } = dimensions;

        setBackgroundSize(`${(elementWith * width) / height}px ${elementWith}px`);
    }, [dimensions]);

    useEffect(() => {
        if (!loadedImage) return () => {};

        const element = ref.current;
        let id;

        if ((value || countEffect) && element) {
            let index = 1;

            id = setInterval(() => {
                element.style.backgroundPosition = `-${element.clientWidth * index}px 0`;
                index++;

                if (index >= length) {
                    index = 0;
                    setCountEffect((count) => count - 1);
                }
            }, 120);
        }

        return () => {
            clearInterval(id);
            element.style.backgroundPosition = `0 0`;
        };
    }, [length, value, countEffect, loadedImage]);

    return (
        <div
            onClick={onClick}
            onMouseEnter={setTrue}
            onMouseLeave={handleMouseLeave}
            className={classNames(
                'p-1 cursor-pointer rounded-md transition-all',
                count || 'hover:bg-[#f3f5f6] dark:hover:bg-dark-tooltip-color',
                className,
            )}
        >
            <div
                style={{ backgroundImage: `url(${url})`, backgroundSize }}
                ref={ref}
                className="aspect-square bg-left-top bg-no-repeat"
            />
        </div>
    );
};

StickerItem.propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default withErrorBoundary(StickerItem, {
    fallback: null,
    onError: (error, info) => {
        toast.error('StickerItem::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
