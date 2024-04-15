import getDate from './getDate';
import getDateString from './getDateString';
import getTime from './getTime';

const getTimeChat = (time) => {
    const timeString = getDateString(time);
    const isoNow = getDateString(new Date());

    if (isoNow.slice(0, 10) !== timeString.slice(0, 10)) return getDate(time);

    return getTime(time);
};

export default getTimeChat;
