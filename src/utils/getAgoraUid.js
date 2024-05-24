const MAX = Math.pow(2, 32) - 1;

const getAgoraUid = (string) => {
    return (
        string.split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0) % MAX
    );
};

export default getAgoraUid;
