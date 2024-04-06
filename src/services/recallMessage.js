import api, { axiosClient } from '~/api';

const recallMessage = async (messageId) => await axiosClient.post(api.recallMessage(), { messageId });

export default recallMessage;
