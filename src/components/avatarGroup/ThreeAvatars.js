import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const ThreeAvatars = ({ avatars, size }) => {
    return (
        <>
            <Avatar size={size} className="absolute top-0 left-2/4 -translate-x-2/4 z-2" src={avatars[0]} />
            <Avatar size={size} className="absolute bottom-0 left-0 z-1" src={avatars[1]} />
            <Avatar size={size} className="absolute bottom-0 right-0" src={avatars[2]} />
        </>
    );
};

ThreeAvatars.propTypes = {
    size: PropTypes.string,
    avatars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withErrorBoundary(ThreeAvatars, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ThreeAvatars::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
