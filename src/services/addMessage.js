import api, { axiosClient } from '~/api';

// FIXME
// const addMessage = (data) =>
//     axios.post(api.addMessage(), data, {
//         headers: {
//             Authorization: `Bearer ${token.get()}`,
//         },
//         baseURL: process.env.REACT_APP_BASE_URL,
//     });

const addMessage = (data) => axiosClient.post(api.addMessage(), data);

export default addMessage;
