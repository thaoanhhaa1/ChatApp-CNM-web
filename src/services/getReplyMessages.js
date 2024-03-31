import api, { axiosClient } from '~/api';

const getReplyMessages = (messageId) => axiosClient.get(api.getReplyMessages(messageId));

export default getReplyMessages;
