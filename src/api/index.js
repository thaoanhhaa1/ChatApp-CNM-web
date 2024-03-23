const api = {
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    logout: () => `/auth/logout`,
};

export default api;
export { default as axiosClient } from './axiosClient';
