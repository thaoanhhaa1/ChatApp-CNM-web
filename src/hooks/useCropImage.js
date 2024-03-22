import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useImageSize } from 'react-image-size';
import { constants } from '~/constants';
import { calcDimensionCropImage, calcMinMaxPositionCropImage, centerAspectCrop, handleScaleImage } from '~/utils';
import useDebounceEffect from './useDebounceEffect';
import { centerCrop, makeAspectCrop } from 'react-image-crop';

const centerAspectCropValue = centerAspectCrop(centerCrop, makeAspectCrop);

const useCropImage = (imageUrl) => {
    const [dimensions] = useImageSize(imageUrl);
    const { width, height } = useMemo(
        () => calcDimensionCropImage(dimensions, constants.CROP_IMAGE_SIZE),
        [dimensions],
    );
    const [scale, setScale] = useState(1);
    const [oldScale, setOldScale] = useState(1);
    const [dragStart, setDragStart] = useState(false);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState(centerPoint);
    const [screen, setScreen] = useState({ x: 0, y: 0 });
    const ref = useRef();
    const cropRef = useRef();
    const imageRef = useRef();
    const previewCanvasRef = useRef();

    const handleWheel = (e) => {
        let newScale = handleScaleImage(scale, e.deltaY < 0);
        setOldScale(scale);
        setScale(newScale);
    };

    const handleMouseDown = (e) => {
        const { clientX, clientY } = e;

        setScreen({ x: clientX, y: clientY });
        setDragStart(true);
    };

    const handleImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCropValue(width, height, 1));

        URL.revokeObjectURL(imageUrl);
    };

    const handleClickScaleDown = () => {
        setOldScale(scale);
        setScale(handleScaleImage(scale));
    };

    const handleClickScaleUp = () => {
        setOldScale(scale);
        setScale(handleScaleImage(scale, true));
    };

    const handleChangeSlider = (e) => {
        setOldScale(scale);
        setScale(e.target.value);
    };

    const handleMouseMove = useCallback(
        (e) => {
            if (!dragStart) return;

            const { clientX, clientY } = e;

            const minMaxPosition = calcMinMaxPositionCropImage(
                constants.CROP_IMAGE_SIZE,
                centerPoint,
                { width, height },
                scale,
            );

            setPosition((p) => ({
                x: Math.max(minMaxPosition.x.min, Math.min(p.x - (screen.x - clientX), minMaxPosition.x.max)),
                y: Math.max(minMaxPosition.y.min, Math.min(p.y - (screen.y - clientY), minMaxPosition.y.max)),
            }));
            setScreen({ x: clientX, y: clientY });
        },
        [centerPoint, dragStart, height, scale, screen.x, screen.y, setPosition, setScreen, width],
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDragEnd = () => setDragStart(false);

    useDebounceEffect(
        async () => {
            const previewCanvas = previewCanvasRef.current;

            if (imageRef.current && previewCanvas) {
                const ctx = previewCanvas.getContext('2d');

                ctx.drawImage(
                    imageRef.current,
                    ((centerPoint.x - constants.CROP_IMAGE_SIZE / 2 - position.x) * dimensions.width) / width / scale,
                    ((centerPoint.y - constants.CROP_IMAGE_SIZE / 2 - position.y) * dimensions.height) / height / scale,
                    dimensions.width / scale,
                    dimensions.height / scale,
                    0,
                    0,
                    constants.CROP_IMAGE_SIZE,
                    constants.CROP_IMAGE_SIZE,
                );

                ctx.restore();
            }
        },
        100,
        [scale, centerPoint, width, height, position, dimensions],
    );

    useEffect(() => {
        if (oldScale === scale) return;

        const isUp = scale > oldScale;
        const scaleX = ((width * constants.SCALE_PER_WHEEL) / 2) * (isUp ? 1 : -1);
        const scaleY = ((height * constants.SCALE_PER_WHEEL) / 2) * (isUp ? 1 : -1);

        const minMaxPosition = calcMinMaxPositionCropImage(
            constants.CROP_IMAGE_SIZE,
            centerPoint,
            { width, height },
            scale,
        );

        setPosition((p) => ({
            x: Math.max(minMaxPosition.x.min, Math.min(p.x - scaleX, minMaxPosition.x.max)),
            y: Math.max(minMaxPosition.y.min, Math.min(p.y - scaleY, minMaxPosition.y.max)),
        }));
        setOldScale(scale);
    }, [centerPoint, height, oldScale, position.x, scale, setOldScale, setPosition, width]);

    useEffect(() => {
        const element = ref.current;
        const widthElement = element?.offsetWidth || 0;
        const heightElement = element?.offsetHeight || 0;

        setCenterPoint({ x: widthElement / 2, y: heightElement / 2 });
        setPosition({ x: (widthElement - width) / 2, y: (heightElement - height) / 2 });
    }, [height, ref, setCenterPoint, setPosition, width]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleDragEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [handleDragEnd, handleMouseMove]);

    return {
        width,
        height,
        scale,
        oldScale,
        dragStart,
        crop,
        completedCrop,
        centerPoint,
        position,
        screen,
        ref,
        cropRef,
        imageRef,
        previewCanvasRef,
        setScale,
        setOldScale,
        setDragStart,
        setCrop,
        setCompletedCrop,
        setCenterPoint,
        setPosition,
        setScreen,
        handleChangeSlider,
        handleClickScaleDown,
        handleClickScaleUp,
        handleDragEnd,
        handleImageLoad,
        handleMouseDown,
        handleMouseMove,
        handleScaleImage,
        handleWheel,
    };
};

export default useCropImage;
