const isVideoFile = (type) => {
    if (type === 'video/x-matroska') return false;

    return /^video\/.*/.test(type);
};

export default isVideoFile;
