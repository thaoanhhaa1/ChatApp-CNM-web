import api, { axiosClient } from '~/api';

const addMessage = (data) => axiosClient.post(api.addMessage(), data);

export default addMessage;
