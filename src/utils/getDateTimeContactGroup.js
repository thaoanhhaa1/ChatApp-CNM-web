import getNumberFormat from './getNumberFormat';

const getDateTimeContactGroup = (date) => {
    const [day, month] = date.toLocaleDateString().split('/');

    return `${getNumberFormat(day)}/${getNumberFormat(month)}`;
};

export default getDateTimeContactGroup;
