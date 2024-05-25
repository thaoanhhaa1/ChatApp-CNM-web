import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const TwoAvatars = ({ avatars, size }) => {
    return (
        <>
            <Avatar size={size} className="absolute bottom-0 left-0 z-1" src={avatars[0]} />
            <Avatar size={size} className="absolute top-0 right-0" src={avatars[1]} />
        </>
    );
};

TwoAvatars.propTypes = {
    size: PropTypes.string,
    avatars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withErrorBoundary(TwoAvatars, {
    fallback: null,
    onError: (error, info) => {
        toast.error('TwoAvatars::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
