import PropTypes from 'prop-types';
import { classNames, convertToDMS } from '~/utils';

const MessageLocation = ({ isMe, location }) => {
    if (!location?._id) return null;

    return (
        <div
            className={classNames(
                'relative w-fit flex flex-col px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg',
                isMe
                    ? 'rounded-l-lg bg-sidebar-sub-bg dark:bg-dark-sidebar-bg'
                    : 'rounded-r-lg bg-primary-color bg-opacity-40',
            )}
        >
            <h5 className="text-sm font-medium line-clamp-1 mb-1">{location.name}</h5>
            <p className="text-sm line-clamp-1 mb-2.5">{location.vicinity}</p>
            <a
                target="_blank"
                href={`${process.env.REACT_APP_GOOGLE_MAPS_ENDPOINT}/${convertToDMS(location.coords)}`}
                id="map"
                className="w-[417px] h-[150px]"
                rel="noreferrer"
            >
                View Map
            </a>
        </div>
    );
};

MessageLocation.propTypes = {
    isMe: PropTypes.bool,
    location: PropTypes.object,
};

export default MessageLocation;
