import { useWindowSize } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import StickerItem from './StickerItem';

const StickerList = ({ sticker, setOffsetTop }) => {
    const stickerRef = useRef();
    const { width } = useWindowSize();
    const [widthSticker, setWidthSticker] = useState(0);

    const handleClick = (sticker) => {
        console.log('🚀 ~ handleClick ~ sticker:', sticker);
    };

    useEffect(() => {
        setOffsetTop(stickerRef.current?.offsetTop || 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stickerRef.current?.offsetTop]);

    useLayoutEffect(() => {
        const containerWidth = stickerRef.current.clientWidth;

        setWidthSticker(Math.floor(containerWidth / 4) * 4);
    }, [width]);

    return (
        <div ref={stickerRef}>
            <div className="px-2 ex:px-3 sm:px-4 py-1 text-sm font-medium leading-normal line-clamp-1">
                {sticker.name}
            </div>
            <div style={{ width: `${widthSticker}px` }} className="px-2 ex:px-3 sm:px-4">
                <div className="grid grid-cols-4 gap-2 mb-2 mx-auto">
                    {sticker.stickers.map((sticker) => (
                        <StickerItem onClick={() => handleClick(sticker)} key={sticker.id} url={sticker.spriteURL} />
                    ))}
                </div>
            </div>
        </div>
    );
};

StickerList.propTypes = {
    sticker: PropTypes.object.isRequired,
    setOffsetTop: PropTypes.func.isRequired,
};

export default StickerList;
