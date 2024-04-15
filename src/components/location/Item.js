import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setLocation } from '~/features/location/locationSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import Avatar from '../avatar';
import Detail from './Detail';

const Item = ({ location, onClick = () => {} }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        onClick();
        dispatch(setLocation(location));
        dispatch(addSub(Detail));
    };

    return (
        <div
            className="flex items-center gap-3 px-3 cursor-pointer hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors duration-150"
            onClick={handleClick}
        >
            <Avatar size="32px" src={location.icon} />
            <div className="border-b border-separate py-2 flex-1">
                <h3 className="text-sm line-clamp-1">{location.name}</h3>
                <p className="mt-1 text-ss text-secondary dark:text-secondary line-clamp-2">{location.vicinity}</p>
            </div>
        </div>
    );
};

Item.propTypes = {
    location: PropTypes.shape({
        coords: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }),
        icon: PropTypes.string.isRequired,
        vicinity: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
};

export default Item;
