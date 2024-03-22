import { constants } from '~/constants';

const handleScaleImage = (scale, isScaleUp = false) => {
    if (isScaleUp) return Math.min(constants.MAX_SCALE_IMAGE, +(scale + constants.SCALE_PER_WHEEL).toFixed(2));

    return Math.max(constants.MIN_SCALE_IMAGE, +(scale - constants.SCALE_PER_WHEEL).toFixed(2));
};

export default handleScaleImage;
