const convertToAvatarUrlList = (users) => {
    if (!users) return [];

    return users.map((user) => user.avatar);
};

export default convertToAvatarUrlList;
