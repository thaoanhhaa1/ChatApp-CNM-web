const getNameConversation = (conversation, user) => {
    if (!conversation?._id) return '';

    if (conversation.isGroup) return conversation.name;

    const otherUser = conversation.users.find((u) => u._id !== user._id);
    return otherUser.name;
};

export default getNameConversation;
