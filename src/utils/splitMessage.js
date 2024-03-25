const splitMessage = (chat) => {
    return chat.split(/@~~|~~@/).map((message) => {
        if (chat.includes(`@~~${message}~~@`))
            return {
                content: message.split('~~')[1],
                id: message.split('~~')[0],
                type: 'tag',
            };

        return {
            content: message,
            type: 'text',
        };
    });
};

export default splitMessage;
