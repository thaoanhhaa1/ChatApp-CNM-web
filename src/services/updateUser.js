import api, { axiosClient } from '~/api';

const updateUser = (data) => axiosClient.patch(api.updateUser(), data);

export default updateUser;
