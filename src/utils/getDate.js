import getDateString from './getDateString';

const getDate = (isoDate) => getDateString(isoDate).substring(0, 10);

export default getDate;
