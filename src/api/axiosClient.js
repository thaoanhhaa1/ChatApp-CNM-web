import axios from 'axios';
import config from '~/config';
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
            .post('/auth/refreshToken', {
                refresh_token: token.get(),
            })
            .then((response) => {
                saveToken(response.data.accessToken);
                return resolve(response.data.accessToken);
            })
            .catch((error) => {
                destroyToken();
                window.location.replace(config.routes.signIn);
                return reject(error);
            });
    });
}

axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
            window.location.replace(config.routes.signIn);
            token.set('');
        }
        // status might be undefined
        if (!status) {
            refresh();
        }
        return Promise.reject(error);
    },
);

axiosClient.interceptors.request.use((config) => {
    const access_token = token.get();
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
});

export default axiosClient;
export { destroyToken, saveToken };
