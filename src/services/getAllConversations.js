import api, { axiosClient } from '~/api';

const getAllConversations = () => axiosClient.get(api.getAllConversations());

export default getAllConversations;
