const getTimeChat = (time) => {
    const now = new Date();
    now.setHours(now.getHours() + 7);

    const isoNow = now.toISOString();

    if (isoNow.slice(0, 10) !== time.slice(0, 10)) return time.slice(0, 10).split('-').reverse().join('/');

    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM = hours < 12;

    return `${hours}:${minutes} ${isAM ? 'AM' : 'PM'}`;
};

export default getTimeChat;
