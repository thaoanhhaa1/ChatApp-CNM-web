import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getOtherUserInIndividual } from '~/utils';
import getAvatarsGroup from '~/utils/getAvatarsGroup';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';

const ConversationAvatar = ({ conversation, size }) => {
    const { user } = useSelector((state) => state.user);

    if (!conversation?._id) return null;

    if (conversation.isGroup) {
        if (conversation.picture) return <Avatar src={conversation.picture} size={size} alt={conversation.name} />;

        const avatars = getAvatarsGroup(conversation.users);

        return <AvatarGroup avatars={avatars} size={size} />;
    }

    const otherUser = getOtherUserInIndividual(conversation.users, user._id);

    return <Avatar src={otherUser.avatar} size={size} alt={otherUser.name} />;
};

ConversationAvatar.propTypes = {
    conversation: PropTypes.shape({
        _id: PropTypes.string,
        isGroup: PropTypes.bool,
        users: PropTypes.array,
    }).isRequired,
    size: PropTypes.string,
};

export default ConversationAvatar;
