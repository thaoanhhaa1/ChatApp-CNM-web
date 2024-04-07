import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLocationError } from '~/features/toastAll/toastAllSlice';
import { useLoader } from '~/hooks';
import { classNames, googleMaps, location, nearbySearch } from '~/utils';
import List from '../list';
import Modal from '../modal';
import ScrollbarCustomize from '../scrollbarCustomize';
import Skeleton from '../skeleton';
import Item from './Item';
import ItemSkeleton from './ItemSkeleton';

const Location = ({ onClose = () => {} }) => {
    const { t } = useTranslation();
    const [locations, setLocations] = useState([]);
    const { google, places, marker } = useLoader();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (!places?.PlacesService || !marker?.AdvancedMarkerElement) return;
            setLoading(true);

            try {
                const map = googleMaps(location, google, marker, document.querySelector('#map'));

                const { lat, lng } = location.coords;
                const request = {
                    location: new google.maps.LatLng(lat, lng),
                    radius: '500',
                };

                const results = await nearbySearch(map, places, request);
                setLocations(
                    results.map((item) => ({
                        coords: {
                            lat: item.geometry.location.lat(),
                            lng: item.geometry.location.lng(),
                        },
                        icon: item.icon,
                        name: item.name,
                        vicinity: item.vicinity,
                        _id: item.place_id,
                    })),
                );
            } catch (error) {
                dispatch(setLocationError(true));
                onClose();
            } finally {
                setLoading(false);
            }
        })();
    }, [dispatch, google, marker, onClose, places]);

    return (
        <>
            <Modal.Header onClose={onClose}>{t('location.title')}</Modal.Header>

            <div className="relative flex flex-col h-[calc(min(600px,80vh)-45px)] ">
                {loading ? (
                    <Skeleton width="100%" containerClassName="flex-1 absolute z-1 left-0 right-0" height={200} />
                ) : null}
                <div id="map" className={classNames('h-[200px] flex-shrink-0', loading && 'invisible')}></div>
                <h4 className="text-ss font-medium p-3">{t('location.description')}</h4>
                <ScrollbarCustomize>
                    {loading ? (
                        <List length={3} control={ItemSkeleton} />
                    ) : (
                        locations.map((location) => <Item key={location._id} location={location} />)
                    )}
                </ScrollbarCustomize>
            </div>
        </>
    );
};

Location.propTypes = {
    onClose: PropTypes.func,
};

export default Location;
