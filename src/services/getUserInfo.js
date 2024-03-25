import api, { axiosClient } from '~/api';

const getUserInfo = () => axiosClient.get(api.userInfo());

export default getUserInfo;
