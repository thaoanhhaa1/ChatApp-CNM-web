const calcDimensionCropImage = (dimension, minDimension) => {
    const { width, height } = dimension || { width: 0, height: 0 };

    const min = Math.min(width, height);
    const max = Math.max(width, height);
    const aspect = max / min;

    if (dimension?.width > dimension?.height) return { height: minDimension, width: minDimension * aspect };
    return { width: minDimension, height: minDimension * aspect };
};

export default calcDimensionCropImage;
