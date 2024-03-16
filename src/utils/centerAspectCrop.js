import { constants } from '~/constants';

const centerAspectCrop = (centerCrop, makeAspectCrop) => (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: constants.CROP_IMAGE_SIZE,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
};

export default centerAspectCrop;
