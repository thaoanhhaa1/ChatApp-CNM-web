const officeCanView = (file) => {
    if (/\.(ppt|pptx|doc|docx|xls|xlsx)$/i.test(file.name)) return 'office';

    if (/\.(txt|css|html|php|c|cpp|h|hpp|js|pdf)$/.test(file.name)) return 'google';

    return '';
};

export default officeCanView;
