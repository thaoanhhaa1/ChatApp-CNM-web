import api, { axiosClient } from '~/api';

const getMessages = ({ param = [], query, signal }) =>
    axiosClient.get(api.getMessages(...param), {
        params: query,
        signal,
    });

export default getMessages;
