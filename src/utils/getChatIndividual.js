const getChatIndividual = (chats, userId) => {
    if (!chats) return null;

    const chat = chats.find((chat) => !chat.isGroup && chat.users.find((user) => user._id === userId));

    return chat;
};

export default getChatIndividual;
