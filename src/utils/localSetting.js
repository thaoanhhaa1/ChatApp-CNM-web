import crypting from './crypting';

const KEY = 'iuh-cnm-chat-app';

const localSetting = {
    get: () => {
        const data = localStorage.getItem(KEY);

        if (data) return JSON.parse(crypting.decrypt(data));

        return {};
    },
    set: (value) => {
        localStorage.setItem(KEY, crypting.encrypt(JSON.stringify(value)));
    },
};

export default localSetting;
