import api, { axiosClient } from '~/api';

const pinMessage = (messageId) => axiosClient.post(api.pinMessage(messageId));

export default pinMessage;
