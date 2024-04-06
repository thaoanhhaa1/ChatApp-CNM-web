import api, { axiosClient } from '~/api';

const deleteMessageForMe = (messageId) => axiosClient.post(api.deleteMessageForMe(), { messageId });

export default deleteMessageForMe;
