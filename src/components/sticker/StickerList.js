import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import StickerItem from './StickerItem';

const StickerList = ({ sticker, setOffsetTop }) => {
    const stickerRef = useRef();

    const handleClick = (sticker) => {
        console.log('🚀 ~ handleClick ~ sticker:', sticker);
    };

    useEffect(() => {
        setOffsetTop(stickerRef.current?.offsetTop || 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={stickerRef}>
            <div className="px-4 py-1 text-sm font-medium leading-normal text-primary line-clamp-1">{sticker.name}</div>
            <div className="w-[348px] grid grid-cols-4 gap-2 px-4 mb-2 mx-auto">
                {sticker.stickers.map((sticker) => (
                    <StickerItem onClick={() => handleClick(sticker)} key={sticker.id} url={sticker.spriteURL} />
                ))}
            </div>
        </div>
    );
};

StickerList.propTypes = {
    sticker: PropTypes.object.isRequired,
    setOffsetTop: PropTypes.func.isRequired,
};

export default StickerList;
