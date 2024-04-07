import api, { axiosClient } from '~/api';

const changePassword = (data) => axiosClient.post(api.changePassword(), data);

export default changePassword;
