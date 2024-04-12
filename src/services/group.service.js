import api, { axiosClient } from '~/api';

const groupServices = {
    createGroup: ({ data }) => axiosClient.post(api.createGroup(), data),
    getGroups: () => axiosClient.get(api.getGroups()),
};

export default groupServices;
