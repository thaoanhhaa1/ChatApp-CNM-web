import getDate from './getDate';
import getTime from './getTime';

const getTimeChat = (time) => {
    const now = new Date();
    const isoNow = now.toISOString();

    if (isoNow.slice(0, 10) !== time.slice(0, 10)) return getDate(time);

    return getTime(time);
};

export default getTimeChat;
