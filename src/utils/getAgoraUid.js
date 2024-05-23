const getAgoraUid = (string) => {
    return (
        string.split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0) % 65000
    );
};

export default getAgoraUid;
