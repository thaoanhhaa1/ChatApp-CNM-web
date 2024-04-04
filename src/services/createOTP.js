import api, { axiosClient } from '~/api';

const createOTP = (email) => axiosClient.post(api.createOTP(), { contact: email });

export default createOTP;
