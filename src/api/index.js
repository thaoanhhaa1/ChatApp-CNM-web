const api = {
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    logout: () => `/auth/logout`,
    userInfo: () => `/user/info`,
    searchUsers: (value) => `/user?search=${value}`,
    getAllConversations: () => `/conversation`,
    openConversation: () => `/conversation`,
    getMessages: (conversationId) => `/message/${conversationId}`,
    addMessage: () => `/message`,
    getReplyMessages: (messageId) => `/message/reply/${messageId}`,
    deleteMessageForMe: () => `/message/deleteForMe`,
    recallMessage: () => `/message/deleteForAll`,
    createOTP: () => `/auth/createOTP`,
    verifyOTP: () => `/auth/verifyOTP`,
};

export default api;
export { default as axiosClient } from './axiosClient';
