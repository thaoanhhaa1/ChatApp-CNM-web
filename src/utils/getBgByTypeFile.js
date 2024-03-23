const getBgByTypeFile = (fileName) => {
    if (/\.bmp|svg|ico|tiff|cur|hdr|cr2$/.test(fileName)) return '/photo.svg';
    if (/\.rar|zip$/.test(fileName)) return '/zip.svg';
    if (/\.pdf$/.test(fileName)) return '/pdf.svg';
    if (/\.html$/.test(fileName)) return '/html.svg';
    if (/\.xml$/.test(fileName)) return '/xml.svg';
    if (/\.xlsx|xlsm|xlsb|xltx|xltm|xls|xlam|xla|xlw|xlr$/.test(fileName)) return '/excel.svg';
    if (/\.ac3|wma|aiff|aac|ogg|wav|8d|mp3|flac|alac$/.test(fileName)) return '/music.svg';
    if (/\.mp4|mpg|mkv|avi|wmv|m4v|mpeg|hevc|asf|webm|flv|vob$/.test(fileName)) return '/video.svg';
    if (/\.doc|docm|docx|dot|dotm|dotx|htm|mht|mhtml|odt$/.test(fileName)) return '/word.svg';

    return '/empty-file.svg';
};

export default getBgByTypeFile;
