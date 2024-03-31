import api, { axiosClient } from '~/api';

const searchUsers = (value) => axiosClient.get(api.searchUsers(value));

export default searchUsers;
