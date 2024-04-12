import api, { axiosClient } from '~/api';

const authServices = {
    register: (data) => axiosClient.post(api.register(), data),
    login: (data) => axiosClient.post(api.login(), data),
    logout: () => axiosClient.post(api.logout()),
    createOTP: (data) => axiosClient.post(api.createOTP(), data),
    verifyOTP: (data) => axiosClient.post(api.verifyOTP(), data),
    changePassword: (data) => axiosClient.post(api.changePassword(), data),
    sendOTPForgotPassword: (email) => axiosClient.post(api.sendOTPForgotPassword(), { contact: email }),
    verifyOTPForgotPassword: (data) => axiosClient.post(api.verifyOTPForgotPassword(), data),
};

export default authServices;
