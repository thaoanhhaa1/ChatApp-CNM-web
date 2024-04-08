import api, { axiosClient } from '~/api';

const unpinMessage = (messageId) => axiosClient.post(api.unpinMessage(messageId));

export default unpinMessage;
