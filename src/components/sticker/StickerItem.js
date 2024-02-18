import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { useImageSize } from 'react-image-size';
import { useBoolean } from '~/hooks';

const StickerItem = ({ url, onClick = () => {} }) => {
    const ref = useRef();
    const [dimensions] = useImageSize(url);
    const { value, setFalse, setTrue } = useBoolean(false);
    const length = useMemo(() => (dimensions ? dimensions.width / dimensions.height : 0), [dimensions]);

    useEffect(() => {
        const element = ref.current;
        let id;

        if (value && element) {
            let index = 1;

            id = setInterval(() => {
                element.style.backgroundPosition = `-${element.clientWidth * index}px 0`;
                index++;

                if (index >= length) index = 0;
            }, 120);
        }

        return () => {
            clearInterval(id);
            element.style.backgroundPosition = `0 0`;
        };
    }, [length, value]);

    return (
        <div
            onClick={onClick}
            onMouseEnter={setTrue}
            onMouseLeave={setFalse}
            className="p-1 cursor-pointer rounded-md hover:bg-[#f3f5f6] transition-all"
        >
            <div
                ref={ref}
                style={{
                    backgroundImage: `url('${url}')`,
                }}
                className="aspect-square bg-left-top bg-no-repeat bg-cover"
            ></div>
        </div>
    );
};

StickerItem.propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default StickerItem;
