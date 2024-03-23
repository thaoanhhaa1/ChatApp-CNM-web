import api, { axiosClient } from '~/api';

const register = (data) => axiosClient.post(api.register(), data);

export default register;
