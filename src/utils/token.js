const KEY = 'iuh-cnm-zalo-access-token';

const token = {
    get: () => localStorage.getItem(KEY),
    set: (token) => localStorage.setItem(KEY, token),
};

export default token;
