const isCanRecall = (createdAt) => {
    const now = new Date().getTime();
    const createdDate = new Date(createdAt).getTime();

    return now - createdDate < 1000 * 60 * 60 * 24;
};

export default isCanRecall;
