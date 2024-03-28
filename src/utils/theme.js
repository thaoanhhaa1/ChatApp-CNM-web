const KEY = 'iuh-cnm-zalo-theme';

const theme = {
    get: () => localStorage.getItem(KEY) || 'light',
    set: (value) => localStorage.setItem(KEY, value),
};

export default theme;
