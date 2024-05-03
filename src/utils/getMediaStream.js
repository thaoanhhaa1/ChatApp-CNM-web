const getMediaStream = ({ video = true, audio = true }) =>
    new Promise((resolve) => {
        navigator.mediaDevices
            .getUserMedia({ video, audio })
            .then(resolve)
            .catch((error) => {
                console.error(error);
                resolve(null);
            });
    });

export default getMediaStream;
