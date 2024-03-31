import getDate from './getDate';
import getTime from './getTime';

const getTimeChat = (time) => {
    const timeString = time instanceof Date ? time.toISOString() : time;
    const now = new Date();
    const isoNow = now.toISOString();

    if (isoNow.slice(0, 10) !== timeString.slice(0, 10)) return getDate(timeString);

    return getTime(timeString);
};

export default getTimeChat;
