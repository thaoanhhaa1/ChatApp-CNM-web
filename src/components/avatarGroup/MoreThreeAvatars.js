import PropTypes from 'prop-types';
import Avatar from './Avatar';
import AvatarText from './AvatarText';

const MoreThreeAvatars = ({ size, avatars }) => {
    const length = avatars.length;

    return (
        <>
            <Avatar size={size} className="absolute top-0 left-0 z-3" src={avatars[0]} />
            <Avatar size={size} className="absolute top-0 right-0 z-2" src={avatars[1]} />
            <Avatar size={size} className="absolute bottom-0 left-0" src={avatars[2]} />
            {length === 4 ? (
                <Avatar size={size} className="absolute bottom-0 right-0 z-1" src={avatars[3]} />
            ) : (
                <AvatarText size={size} className="absolute bottom-0 right-0 z-1" text={length > 99 ? '99+' : length} />
            )}
        </>
    );
};

MoreThreeAvatars.propTypes = {
    avatars: PropTypes.array.isRequired,
    size: PropTypes.string,
};

export default MoreThreeAvatars;
