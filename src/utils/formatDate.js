const formatDate = (date) => {
    return date.split('-').reverse().join('/');
};

export default formatDate;
