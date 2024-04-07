const api = {
    // Auth
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    logout: () => `/auth/logout`,
    createOTP: () => `/auth/createOTP`,
    verifyOTP: () => `/auth/verifyOTP`,

    // User
    userInfo: () => `/user/info`,
    searchUsers: (value) => `/user?search=${value}`,

    // Conversation
    getAllConversations: () => `/conversation`,
    openConversation: () => `/conversation`,
    togglePinConversation: (conversationId) => `/conversation/pin/${conversationId}`,

    // Message
    getMessages: (conversationId) => `/message/${conversationId}`,
    addMessage: () => `/message`,
    getReplyMessages: (messageId) => `/message/reply/${messageId}`,
    deleteMessageForMe: () => `/message/deleteForMe`,
    recallMessage: () => `/message/deleteForAll`,
    pinMessage: (messageId) => `/message/pin/${messageId}`,
};

export default api;
export { default as axiosClient } from './axiosClient';
