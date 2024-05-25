import { useWindowSize } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, sendMessage } from '~/features/messages/messagesSlice';
import StickerItem from './StickerItem';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const StickerList = ({ sticker, setOffsetTop }) => {
    const stickerRef = useRef();
    const { width } = useWindowSize();
    const [widthSticker, setWidthSticker] = useState(0);
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { reply } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const handleClick = (sticker) => {
        const timeSend = Date.now();
        const message = { sticker: sticker.spriteURL, conversationId: active._id, reply: reply?._id, timeSend };

        dispatch(sendMessage(message));
        dispatch(
            addMessage({
                ...message,
                sender: user,
            }),
        );
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
            <div className="text-primary dark:text-dark-primary px-2 ex:px-3 sm:px-4 py-1 text-sm font-medium leading-normal line-clamp-1">
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

export default withErrorBoundary(StickerList, {
    fallback: null,
    onError: (error, info) => {
        toast.error('StickerList::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
