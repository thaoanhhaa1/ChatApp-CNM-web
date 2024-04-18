import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle } from 'react';
import ReactCrop from 'react-image-crop';
import { constants } from '~/constants';
import { useCropImage } from '~/hooks';
import ControlScale from './ControlScale';

// FIXME ReactCrop__crop-mask
const CropImage = forwardRef(({ imageUrl }, forwardRef) => {
    const {
        width,
        height,
        completedCrop,
        crop,
        cropRef,
        dragStart,
        imageRef,
        position,
        previewCanvasRef,
        ref,
        scale,
        setCompletedCrop,
        handleChangeSlider,
        handleClickScaleDown,
        handleClickScaleUp,
        handleImageLoad,
        handleMouseDown,
        handleWheel,
    } = useCropImage(imageUrl);

    useImperativeHandle(
        forwardRef,
        () => ({
            getImageFile: () => {
                const image = imageRef.current;
                const previewCanvas = previewCanvasRef.current;
                if (!image || !previewCanvas) return;

                const offscreen = new OffscreenCanvas(constants.CROP_IMAGE_SIZE, constants.CROP_IMAGE_SIZE);
                const ctx = offscreen.getContext('2d');
                if (!ctx) return;

                ctx.drawImage(
                    previewCanvas,
                    0,
                    0,
                    previewCanvas.width,
                    previewCanvas.height,
                    0,
                    0,
                    offscreen.width,
                    offscreen.height,
                );

                return offscreen.convertToBlob();
            },
        }),
        [imageRef, previewCanvasRef],
    );

    return (
        <div className="relative">
            <div onWheel={handleWheel} className="aspect-square flex" ref={ref}>
                <ReactCrop
                    locked
                    circularCrop
                    ruleOfThirds={dragStart}
                    crop={crop}
                    className="aspect-square"
                    ref={cropRef}
                    onComplete={setCompletedCrop}
                >
                    <div
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: `${width * scale}px ${height * scale}px`,
                            backgroundPosition: `${position.x}px ${position.y}px`,
                        }}
                        className="absolute inset-0 aspect-square bg-no-repeat"
                    />
                    <div
                        onMouseDown={handleMouseDown}
                        className="ReactCrop-circle absolute rounded-full z-1 cursor-move"
                        style={{
                            width: `${constants.CROP_IMAGE_SIZE}px`,
                            height: `${constants.CROP_IMAGE_SIZE}px`,
                        }}
                    />
                    <img
                        onLoad={handleImageLoad}
                        className="opacity-0 aspect-square pointer-events-none"
                        src={imageUrl}
                        alt=""
                        ref={imageRef}
                    />
                </ReactCrop>
            </div>

            <ControlScale
                scale={scale}
                onChangeScale={handleChangeSlider}
                onScaleDown={handleClickScaleDown}
                onScaleUp={handleClickScaleUp}
            />

            <div className="hidden">{completedCrop ? <canvas ref={previewCanvasRef} /> : null}</div>
        </div>
    );
});

CropImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
};

export default CropImage;
