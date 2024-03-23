const calcMinMaxPositionCropImage = (cropSize, centerPoint, imageSize, scale) => {
    const halfOfImageSize = cropSize / 2;
    const { width, height } = imageSize;

    const top = centerPoint.y - halfOfImageSize;
    const bottom = centerPoint.y + halfOfImageSize - height * scale;
    const left = centerPoint.x - halfOfImageSize;
    const right = centerPoint.x + halfOfImageSize - width * scale;

    return {
        x: {
            min: right,
            max: left,
        },
        y: {
            min: bottom,
            max: top,
        },
    };
};

export default calcMinMaxPositionCropImage;
