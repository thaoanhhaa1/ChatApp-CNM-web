import PropTypes from 'prop-types';
import Avatar from './Avatar';

const TwoAvatars = ({ avatars, size }) => {
    return (
        <>
            <Avatar size={size} className="absolute bottom-0 left-0 z-1" src={avatars[0]} />
            <Avatar size={size} className="absolute top-0 right-0" src={avatars[1]} />
        </>
    );
};

TwoAvatars.propTypes = {
    avatar: PropTypes.string.isRequired,
};

export default TwoAvatars;
