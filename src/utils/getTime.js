import getDateString from './getDateString';

const getTime = (isoDate) => getDateString(isoDate).substring(12, 17);

export default getTime;
