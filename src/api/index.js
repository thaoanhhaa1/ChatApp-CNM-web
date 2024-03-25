const api = {
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    logout: () => `/auth/logout`,
    userInfo: () => `/user/info`,
};

export default api;
export { default as axiosClient } from './axiosClient';
