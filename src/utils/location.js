const coords = {};

const getCoords = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                coords.lat = position.coords.latitude;
                coords.lng = position.coords.longitude;
                resolve(coords);
            },
            (error) => {
                reject(error);
            },
        );
    });
};

const location = {
    coords,
    getCoords,
};

export default location;
