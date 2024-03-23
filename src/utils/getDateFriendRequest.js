import getNumberFormat from './getNumberFormat';

const getDateFriendRequest = (date) => {
    const [month, day, year] = date.toLocaleDateString().split('/');

    return `${getNumberFormat(day)}/${getNumberFormat(month)}/${year}`;
};

export default getDateFriendRequest;
