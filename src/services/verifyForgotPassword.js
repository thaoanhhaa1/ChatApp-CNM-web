import api, { axiosClient } from '~/api';

const verifyOTPForgotPassword = (data) => axiosClient.post(api.verifyOTPForgotPassword(), data);

export default verifyOTPForgotPassword;
