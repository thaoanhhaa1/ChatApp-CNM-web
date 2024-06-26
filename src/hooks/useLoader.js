import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useMemo, useState } from 'react';

const useLoader = () => {
    const loader = useMemo(
        () =>
            new Loader({
                apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                version: 'weekly',
                libraries: ['places', 'marker'],
            }),
        [],
    );
    const [google, setGoogle] = useState(null);
    const [places, setPlaces] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        (async () => {
            const google = await loader.load();
            const places = await google.maps.importLibrary('places');
            const marker = await google.maps.importLibrary('marker');
            setGoogle(google);
            setPlaces(places);
            setMarker(marker);
        })();
    }, [loader]);

    return { google, places, marker };
};

export default useLoader;
