import images from '~/assets/images';

const getMentions = (users, me) => {
    if (!Array.isArray(users)) return [];

    if (users.length <= 2) return [];

    return users.map((user) => {
        if (user._id === me)
            return {
                id: 'all',
                display: 'All',
                avatar: images.mentionAll,
            };

        return {
            id: user._id,
            display: user.name,
            avatar: user.avatar,
        };
    });
};

export default getMentions;
