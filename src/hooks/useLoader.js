import { Loader } from '@googlemaps/js-api-loader';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';

const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places', 'marker'],
});

const useLoader = () => {
    // FIXME
    // const { i18n } = useTranslation();
    // const loader = useMemo(
    //     () =>
    //         new Loader({
    //             apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //             version: 'weekly',
    //             libraries: ['places', 'marker'],
    //             language: i18n.language === 'vn' ? 'vi' : i18n.language,
    //         }),
    //     [i18n],
    // );
    const [google, setGoogle] = useState(null);
    const [places, setPlaces] = useState(null);
    const [marker, setMarker] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         // FIXME: This is a workaround for the issue of the library not being loaded
    //         const google = await loader.load();
    //         const places = await google.maps.importLibrary('places');
    //         const marker = await google.maps.importLibrary('marker');

    //         setGoogle(google);
    //         setPlaces(places);
    //         setMarker(marker);
    //     })();
    // }, [loader]);

    return { google, places, marker };
};

export default useLoader;
