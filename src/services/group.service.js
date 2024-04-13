import api, { axiosClient } from '~/api';

const groupServices = {
    createGroup: ({ data }) => axiosClient.post(api.createGroup(), data),
    getGroups: () => axiosClient.get(api.getGroups()),
    deleteGroup: ({ params }) => axiosClient.delete(api.deleteGroup(params)),
};

export default groupServices;
