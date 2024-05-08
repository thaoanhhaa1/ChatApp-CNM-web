const getMediaStream = ({ video = true, audio = true }) =>
    new Promise((resolve) => {
        navigator.mediaDevices
            .getUserMedia({ video, audio, aspectRatio: 16 / 9 })
            .then(resolve)
            .catch((error) => {
                console.error(error);
                resolve(null);
            });
    });

export default getMediaStream;
