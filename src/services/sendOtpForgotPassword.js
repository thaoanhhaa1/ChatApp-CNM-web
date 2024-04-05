import api, { axiosClient } from '~/api';

const sendOTPForgotPassword = (email) => axiosClient.post(api.sendOTPForgotPassword(), { contact: email });

export default sendOTPForgotPassword;
