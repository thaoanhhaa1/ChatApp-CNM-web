import api, { axiosClient } from '~/api';

const messageServices = {
    getMessages: ({ param = [], query, signal }) =>
        axiosClient.get(api.getMessages(...param), {
            params: query,
            signal,
        }),
    addMessage: (data) => axiosClient.post(api.addMessage(), data),
    getReplyMessages: ({ params }) => axiosClient.get(api.getReplyMessages(params)),
    deleteMessageForMe: (messageId) => axiosClient.post(api.deleteMessageForMe(), { messageId }),
    recallMessage: (messageId) => axiosClient.post(api.recallMessage(), { messageId }),
    pinMessage: (messageId) => axiosClient.post(api.pinMessage(messageId)),
    unpinMessage: (messageId) => axiosClient.post(api.unpinMessage(messageId)),
    forward: ({ messageId, conversationIds }) =>
        axiosClient.post(api.forward(), {
            messageId,
            conversationIds,
        }),
    react: ({ react, messageId }) => axiosClient.post(api.react(), { react, messageId }),
    addMessageNotification: (data) => axiosClient.post(api.addMessageNotification(), data),
    getAttachedFiles: ({ params }) => axiosClient.get(api.getAttachedFiles(params)),
};

export default messageServices;
