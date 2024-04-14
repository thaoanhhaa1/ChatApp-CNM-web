import PropTypes from 'prop-types';
import Avatar from './Avatar';
import AvatarText from './AvatarText';

const OneAvatar = ({ avatar, size }) => {
    return (
        <>
            <Avatar size={size} className="absolute bottom-0 left-0 z-1" src={avatar} />
            <AvatarText size={size} className="absolute top-0 right-0" text={1} />
        </>
    );
};

OneAvatar.propTypes = {
    avatar: PropTypes.string.isRequired,
    size: PropTypes.string,
};

export default OneAvatar;
