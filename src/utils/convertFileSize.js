function convertFileSize(bytes) {
    if (bytes / (1024 * 3) >= 1) return `${(bytes / (1024 * 3)).toFixed(2)} GB`;

    if (bytes / (1024 * 2) >= 1) return `${(bytes / (1024 * 2)).toFixed(2)} MB`;

    return `${(bytes / 1024).toFixed(2)} KB`;
}

export default convertFileSize;
