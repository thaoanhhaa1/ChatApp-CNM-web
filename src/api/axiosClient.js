import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosClient = axios.create({ baseURL });

function saveToken(access_token) {
    sessionStorage.setItem('access_token', access_token);
}

function destroyToken() {
    sessionStorage.removeItem('access_token');
}

function refresh() {
    return new Promise((resolve, reject) => {
        axiosClient
            .post('/auth/refreshToken', {
                refresh_token: sessionStorage.getItem('refresh_token'),
            })
            .then((response) => {
                saveToken(response.data.accessToken);
                return resolve(response.data.accessToken);
            })
            .catch((error) => {
                destroyToken();
                window.location.replace('/logout');
                return reject(error);
            });
    });
}

axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
            window.location.replace('/logout');
            sessionStorage.removeItem('access_token');
        }
        // status might be undefined
        if (!status) {
            refresh();
        }
        return Promise.reject(error);
    },
);

axiosClient.interceptors.request.use((config) => {
    const access_token = sessionStorage.getItem('access_token');
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
});

export default axiosClient;
export { destroyToken, saveToken };
