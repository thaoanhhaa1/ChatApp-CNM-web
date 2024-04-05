const api = {
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    logout: () => `/auth/logout`,
    userInfo: () => `/user/info`,
    getAllConversations: () => `/conversation`,
    openConversation: () => `/conversation`,
    searchUsers: (value) => `/user?search=${value}`,
    getMessages: (conversationId) => `/message/${conversationId}`,
    addMessage: () => `/message`,
    getReplyMessages: (messageId) => `/message/reply/${messageId}`,
    createOTP: () => `/auth/createOTP`,
    verifyOTP: () => `/auth/verifyOTP`,
    sendOTPForgotPassword: () => `/auth/forgotpassword`,
    verifyOTPForgotPassword: () => `auth/forgot-password`
};

export default api;
export { default as axiosClient } from './axiosClient';
