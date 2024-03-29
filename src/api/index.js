const api = {
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    logout: () => `/auth/logout`,
    userInfo: () => `/user/info`,
    getAllConversations: () => `/conversation`,
    openConversation: () => `/conversation`,
    searchUsers: (value) => `/user?search=${value}`,
};

export default api;
export { default as axiosClient } from './axiosClient';
