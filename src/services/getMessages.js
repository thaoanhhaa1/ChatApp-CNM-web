import api, { axiosClient } from '~/api';

const getMessages = (conversationId, page = 1, size = 20) =>
    axiosClient.get(api.getMessages(conversationId), {
        params: {
            page,
            size,
        },
    });

export default getMessages;
