import api, { axiosClient } from '~/api';

const conversationServices = {
    getAllConversations: () => axiosClient.get(api.getAllConversations()),
    openConversation: (receiverId) => axiosClient.post(api.openConversation(), { receiverUserId: receiverId }),
    togglePinConversation: (conversationId) => axiosClient.get(api.togglePinConversation(conversationId)),
};

export default conversationServices;
