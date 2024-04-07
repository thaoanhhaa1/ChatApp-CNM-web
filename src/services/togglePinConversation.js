import api, { axiosClient } from '~/api';

const togglePinConversation = (conversationId) => axiosClient.get(api.togglePinConversation(conversationId));

export default togglePinConversation;
