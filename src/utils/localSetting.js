const KEY = 'iuh-cnm-chat-app';

const localSetting = {
    get: () => {
        const data = localStorage.getItem(KEY);

        if (data) return JSON.parse(data);

        return {};
    },
    set: (value) => {
        localStorage.setItem(KEY, JSON.stringify(value));
    },
};

export default localSetting;
