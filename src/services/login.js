import api, { axiosClient } from '~/api';

const login = (data) => axiosClient.post(api.login(), data);

export default login;
