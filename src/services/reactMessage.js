import api, { axiosClient } from '~/api';

const reactMessage = ({ react, messageId }) => axiosClient.post(api.react(), { react, messageId });

export default reactMessage;
