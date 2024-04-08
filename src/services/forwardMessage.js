import api, { axiosClient } from '~/api';

const forwardMessage = ({ messageId, conversationIds }) =>
    axiosClient.post(api.forward(), {
        messageId,
        conversationIds,
    });

export default forwardMessage;
