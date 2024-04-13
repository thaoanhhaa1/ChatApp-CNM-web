import api, { axiosClient } from '~/api';

const groupServices = {
    createGroup: ({ data }) => axiosClient.post(api.createGroup(), data),
    getGroups: () => axiosClient.get(api.getGroups()),
    deleteGroup: ({ params }) => axiosClient.delete(api.deleteGroup(params)),
    addUsers: ({ params, data }) => axiosClient.post(api.addUsers(params), data),
    removeUser: ({ params, data }) => axiosClient.delete(api.removeUser(params), data),
};

export default groupServices;
