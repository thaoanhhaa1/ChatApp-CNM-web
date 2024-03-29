import api, { axiosClient } from '~/api';

const openConversation = (receiverId) => axiosClient.post(api.openConversation(), { reciverUserId: receiverId });

export default openConversation;
