const getNumberFormat = (number) => (+number > 9 && number) || '0' + number;

export default getNumberFormat;
