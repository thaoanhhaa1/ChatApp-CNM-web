const isUserInConversation = (conversation, userId) => {
    if (!conversation) return false;

    return conversation.users.some((user) => user._id === userId);
};

export default isUserInConversation;
