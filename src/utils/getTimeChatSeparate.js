import getDateString from './getDateString';

const getTimeChatSeparate = (date) => {
    const dateNow = new Date();

    const yearNow = dateNow.getFullYear();
    const monthNow = dateNow.getMonth() + 1;
    const dayNow = dateNow.getDate();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (year === yearNow && month === monthNow) {
        if (day === dayNow) return 'Today';

        if (day === dateNow - 1) return 'Yesterday';
    }

    return getDateString(date);
};

export default getTimeChatSeparate;
