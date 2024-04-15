const isPinConversation = (chat, user) => chat?.pinBy.includes(user._id);

export default isPinConversation;
