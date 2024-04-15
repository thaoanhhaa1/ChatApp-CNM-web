import api, { axiosClient } from '~/api';

const userServices = {
    getUserInfo: () => axiosClient.get(api.userInfo()),
    searchUsers: (value) => axiosClient.get(api.searchUsers(value)),
    updateUser: (data) => axiosClient.patch(api.updateUser(), data),
};

export default userServices;
