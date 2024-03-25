const isShowTimeChatSeparate = (date, nextDate) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const yearNext = nextDate.getFullYear();
    const monthNext = nextDate.getMonth();
    const dayNext = nextDate.getDate();

    return year !== yearNext || month !== monthNext || day !== dayNext;
};

export default isShowTimeChatSeparate;
