import axios from 'axios';
import { token } from '~/utils';

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosClient = axios.create({ baseURL });

function saveToken(access_token) {
    token.set(access_token);
}

function destroyToken() {
    token.set('');
}

function refresh() {
    return new Promise((resolve, reject) => {
        axiosClient
            .post('/auth/refreshToken')
            .then((response) => {
                saveToken(response.data.accessToken);
                return resolve(response.data.accessToken);
            })
            .catch((error) => {
                destroyToken();
                return reject(error);
            });
    });
}

axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        // TODO refreshToken
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            token.set(newAccessToken);
            return axiosClient(prevRequest);
        }
        return Promise.reject(error);
    },
);

axiosClient.interceptors.request.use(
    (config) => {
        const access_token = token.get();
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosClient;
export { destroyToken, saveToken };
