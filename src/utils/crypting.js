const crypting = {
    encrypt: (text) => {
        return btoa(text);
    },
    decrypt: (text) => {
        return atob(text);
    },
};

export default crypting;
