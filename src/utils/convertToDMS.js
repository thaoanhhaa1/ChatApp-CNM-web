const convertToDMS = ({ lat, lng }) => {
    function toDegreesMinutesAndSeconds(coordinate) {
        let absolute = Math.abs(coordinate);
        let degrees = Math.floor(absolute);
        let minutesNotTruncated = (absolute - degrees) * 60;
        let minutes = Math.floor(minutesNotTruncated);
        let seconds = Math.floor((minutesNotTruncated - minutes) * 60);

        return `${degrees}°${minutes}'${seconds}"`;
    }

    let latitude = lat >= 0 ? toDegreesMinutesAndSeconds(lat) + 'N' : toDegreesMinutesAndSeconds(lat * -1) + 'S';
    let longitude = lng >= 0 ? toDegreesMinutesAndSeconds(lng) + 'E' : toDegreesMinutesAndSeconds(lng * -1) + 'W';

    return latitude + '+' + longitude;
};

export default convertToDMS;
