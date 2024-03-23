const getUnseenMessageNumber = (number) => (number >= 10 ? (number > 99 ? '99+' : number) : `0${number}`);

export default getUnseenMessageNumber;
