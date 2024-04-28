const isOnlineConversation = ({ users, onlineUserIds }) => {
    return users.some((user) => onlineUserIds.includes(user._id));
};

export default isOnlineConversation;
