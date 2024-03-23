import api, { axiosClient } from '~/api';

const logout = () => axiosClient.post(api.logout());

export default logout;
