import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useImageSize } from 'react-image-size';
import { useBoolean } from '~/hooks';
import { classNames, loadImage } from '~/utils';

const StickerItem = ({ count = 0, className, url, onClick = () => {} }) => {
    const ref = useRef();
    const [dimensions] = useImageSize(url);
    const { value, setFalse, setTrue } = useBoolean(false);
    const length = useMemo(() => (dimensions ? dimensions.width / dimensions.height : 0), [dimensions]);
    const [countEffect, setCountEffect] = useState(count);
    const [loadedImage, setLoadedImage] = useState(false);

    useEffect(() => {
        loadImage(url).then(() => {
            ref.current.style.backgroundImage = `url(${url})`;
            setLoadedImage(true);
        });
    }, [url]);

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
            onMouseLeave={setFalse}
            className={classNames('p-1 cursor-pointer rounded-md hover:bg-[#f3f5f6] transition-all', className)}
        >
            <div ref={ref} className="aspect-square bg-left-top bg-no-repeat bg-cover" />
        </div>
    );
};

StickerItem.propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default StickerItem;
