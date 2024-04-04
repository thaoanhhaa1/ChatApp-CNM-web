import api, { axiosClient } from '~/api';

const openConversation = (receiverId) => axiosClient.post(api.openConversation(), { receiverUserId: receiverId });

export default openConversation;
