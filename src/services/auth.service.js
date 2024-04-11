import api, { axiosClient } from '~/api';

const authServices = {
    register: (data) => axiosClient.post(api.register(), data),
    login: (data) => axiosClient.post(api.login(), data),
    logout: () => axiosClient.post(api.logout()),
    createOTP: (data) => axiosClient.post(api.createOTP(), data),
    verifyOTP: (data) => axiosClient.post(api.verifyOTP(), data),
};

export default authServices;
