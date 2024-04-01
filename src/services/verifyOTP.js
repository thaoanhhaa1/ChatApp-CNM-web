import api, { axiosClient } from '~/api';

const verifyOTP = (data) => axiosClient.post(api.verifyOTP(), data);

export default verifyOTP;
