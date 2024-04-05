const googleMaps = (location, google, marker, element) => {
    const map = new google.maps.Map(element, {
        center: location.coords,
        zoom: 8,
        mapId: `DEMO_MAP_ID`,
    });

    try {
        new marker.AdvancedMarkerElement({
            map,
            position: location.coords,
        });
    } catch (error) {
        console.error('🚀 ~ googleMaps ~ error', error);
    }

    return map;
};

export default googleMaps;
