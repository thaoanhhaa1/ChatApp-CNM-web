const coords = {};

const getCoords = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                coords.lat = position.coords.latitude;
                coords.lng = position.coords.longitude;
                coords.role = true;
                resolve(coords);
            },
            (error) => {
                coords.role = false;
                resolve(coords);
            },
        );
    });
};

const location = {
    coords,
    getCoords,
};

export default location;
