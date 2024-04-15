import api, { axiosClient } from '~/api';

const groupServices = {
    createGroup: ({ data }) => axiosClient.post(api.createGroup(), data),
    getGroups: () => axiosClient.get(api.getGroups()),
    deleteGroup: ({ params }) => axiosClient.delete(api.deleteGroup(params)),
    addUsers: ({ params, data }) => axiosClient.post(api.addUsers(params), data),
    removeUser: ({ params, data }) => axiosClient.delete(api.removeUser(params), data),
    leaveGroup: ({ params }) => axiosClient.post(api.leaveGroup(params)),
    addRole: ({ params, data }) => axiosClient.post(api.addRole(params), data),
    removeRole: ({ params }) => axiosClient.delete(api.removeRole(params)),
};

export default groupServices;
