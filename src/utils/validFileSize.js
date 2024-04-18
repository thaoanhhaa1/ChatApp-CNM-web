import { constants } from '~/constants';

const validFileSize = (bytes) => {
    const maxSize = constants.MAX_FILE_SIZE * 1024 * 1024; // 10MB
    return bytes <= maxSize;
};

export default validFileSize;
