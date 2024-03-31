import getDateString from './getDateString';

const getDateTimeContactGroup = (date) => getDateString(date).substring(0, 5);

export default getDateTimeContactGroup;
