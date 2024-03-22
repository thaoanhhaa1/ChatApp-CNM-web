import { useWindowSize } from '@uidotdev/usehooks';
import { useLayoutEffect, useRef, useState } from 'react';

const Seperate = () => {
    const ref = useRef();
    const [marginX, setMarginX] = useState(0);
    const { width } = useWindowSize();

    useLayoutEffect(() => {
        const element = ref.current;
        const parentElement = element.parentElement;

        const parentWidth = parentElement.offsetWidth;
        const width = element.offsetWidth;

        parentWidth === width || setMarginX((parentWidth - width) / 2);
    }, [width]);

    return (
        <div
            style={{
                marginInline: `-${marginX}px`,
            }}
            ref={ref}
            className="h-2 bg-separate dark:bg-dark-separate"
        />
    );
};

Seperate.propTypes = {};

export default Seperate;
