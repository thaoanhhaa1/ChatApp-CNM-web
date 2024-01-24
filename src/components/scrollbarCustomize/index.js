import { useWindowSize } from '@uidotdev/usehooks';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { classNames } from '~/utils';

function getScroll(elementRef, e) {
    const element = elementRef;
    const elementTrack = e.target;
    const top = element.getBoundingClientRect().top;
    const clientY = e.clientY;

    return { element, elementTrack, top, clientY };
}

const ScrollbarCustomize = (
    { className = '', containerClassName = '', style = {}, children, overflow, onScroll = () => {} },
    ref,
) => {
    const scrollRef = useRef(null);
    const [offsetHeight, setOffsetHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [scrollThumbHeight, setScrollThumbHeight] = useState(0);
    const [scrollThumbTop, setScrollThumbTop] = useState(0);
    const [selectThumb, setSelectThumb] = useState(false);
    const [selectClientY, setSelectClientY] = useState(0);
    const [top, setTop] = useState(0);
    const { width, height } = useWindowSize();

    const handleScroll = (e) => {
        onScroll(e);

        if (!scrollRef.current) return;
        const { element, elementTrack } = getScroll(scrollRef.current, e);
        const scrollTop = elementTrack.scrollTop;
        const scrollHeight = element.scrollHeight;
        const offsetHeight = element.offsetHeight;

        elementTrack.scrollTop = scrollTop;
        element.scrollTop = scrollTop;
        setOffsetHeight(offsetHeight);
        setScrollHeight(scrollHeight);
        setScrollThumbTop((scrollTop * offsetHeight) / scrollHeight);
        setScrollThumbHeight(offsetHeight ** 2 / scrollHeight);
    };

    const handleClickTrack = (e) => {
        if (!scrollRef.current) return;
        const { element, elementTrack, top } = getScroll(scrollRef.current, e);
        const positionClick = e.clientY - top;
        let scrollThumbTopNew;

        if (positionClick < scrollThumbTop) scrollThumbTopNew = Math.max(0, scrollThumbTop - 50);
        else if (positionClick > scrollThumbTop + scrollThumbHeight)
            scrollThumbTopNew = Math.min(scrollThumbTop + 50, offsetHeight - scrollThumbHeight);
        else return;

        const scroll = (scrollThumbTopNew * scrollHeight) / offsetHeight;
        element.scrollTop = scroll;
        elementTrack.scrollTop = scroll;
    };

    const handleMouseDown = (e) => {
        if (!scrollRef.current) return;
        const { top } = getScroll(scrollRef.current, e);
        const positionClick = e.clientY - top;

        if (positionClick >= scrollThumbTop && positionClick <= scrollThumbTop + scrollThumbHeight) {
            setSelectThumb(true);
            setSelectClientY(e.clientY);
            setTop(scrollThumbTop);
        }
    };

    const handleMouseMove = useCallback(
        (e) => {
            if (!scrollRef.current) return;
            let scroll = e.clientY - selectClientY + top;
            const elementTrack = e.target;
            const element = scrollRef.current;

            if (scroll < 0) scroll = 0;
            else if (scroll > offsetHeight - scrollThumbHeight) scroll = offsetHeight - scrollThumbHeight;

            const scrollFit = (scroll * scrollHeight) / offsetHeight;
            element.scrollTop = scrollFit;
            elementTrack.scrollTop = scrollFit;
        },
        [offsetHeight, scrollHeight, scrollThumbHeight, selectClientY, top],
    );

    useEffect(() => {
        const handleMouseUp = () => setSelectThumb(false);

        if (selectThumb) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove, selectThumb]);

    useEffect(() => {
        if (!scrollRef.current) return;

        const element = scrollRef.current;

        const scrollHeight = element.scrollHeight;
        const offsetHeight = element.offsetHeight;

        setOffsetHeight(offsetHeight);
        setScrollHeight(scrollHeight);
        setScrollThumbHeight(offsetHeight ** 2 / scrollHeight);
        if (scrollThumbTop) setScrollThumbTop((element.scrollTop * offsetHeight) / scrollHeight);
    }, [width, height, children, scrollThumbTop]);

    useImperativeHandle(ref, () => ({
        scrollBottom: () => {
            const elem = scrollRef.current;
            elem.scrollTop = elem.scrollHeight;
        },
    }));

    return (
        <div className="h-full relative">
            <div className="absolute inset-0">
                <div className={classNames('relative group/scrollbar h-full', containerClassName)}>
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className={classNames(
                            'scrollbar h-full',
                            overflow ? `overflow-y-${overflow}` : 'overflow-y-auto',
                        )}
                        style={style}
                    >
                        <div className={className}>{children}</div>
                    </div>
                    {offsetHeight && scrollHeight > offsetHeight && (
                        <>
                            <div
                                onClick={handleClickTrack}
                                onScroll={handleScroll}
                                onMouseDown={handleMouseDown}
                                style={{ height: `${offsetHeight}px` }}
                                className="scrollbar scrollbar--track overflow-auto absolute right-0 top-0 bottom-0 w-[11px]"
                            >
                                <div className="w-full" style={{ height: `${scrollHeight}px` }}></div>
                            </div>
                            <div
                                style={{
                                    height: `${scrollThumbHeight}px`,
                                    top: `${scrollThumbTop}px`,
                                }}
                                className={classNames(
                                    'pointer-events-none select-none scrollbar--thumb absolute top-0 right-0 px-[2px] w-[11px] opacity-0 group-hover/scrollbar:opacity-100 group-hover/scrollbar:delay-0 delay-500 duration-100 transition-opacity ease-linear',
                                    selectThumb && '!opacity-100',
                                )}
                            >
                                <div className="w-full h-full rounded bg-[#BCC0C9] dark:bg-[#a2adb7]" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default forwardRef(ScrollbarCustomize);
