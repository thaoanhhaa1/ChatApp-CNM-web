const getOtherUserInIndividual = (users, userId) => {
    if (!users?.length) return null;

    return users.find((user) => user._id !== userId);
};

export default getOtherUserInIndividual;
