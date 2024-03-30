const getDate = (isoDate) => isoDate.substring(0, 10).split('-').reverse().join('/');

export default getDate;
