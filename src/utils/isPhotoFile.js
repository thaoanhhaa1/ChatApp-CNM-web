const isPhotoFile = (fileName) => /\.jpeg|png|webp|gif|jpg|bmp|svg|ico|tiff|cur|hdr|cr2$/i.test(fileName);

export default isPhotoFile;
