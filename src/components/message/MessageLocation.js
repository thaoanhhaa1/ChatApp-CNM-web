import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { convertToDMS } from '~/utils';

const MessageLocation = ({ location }) => {
    if (!location) return null;

    return (
        <div className="relative w-fit flex flex-col">
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
    location: PropTypes.object,
};

export default withErrorBoundary(MessageLocation, {
    fallback: null,
    onError: (error, info) => {
        toast.error('MessageLocation::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
