const getNameConversation = (conversation, userId) => {
    if (!conversation?._id) return '';

    if (conversation.isGroup) return conversation.name;

    const otherUser = conversation.users.find((u) => u._id !== userId);
    return otherUser.name;
};

export default getNameConversation;
