import api, { axiosClient } from '~/api';

const createOTP = (email) => axiosClient.post(api.createOTP(), { phone: email });

export default createOTP;
