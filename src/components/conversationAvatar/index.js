import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { statusUser } from '~/constants';
import { getOtherUserInIndividual } from '~/utils';
import getAvatarsGroup from '~/utils/getAvatarsGroup';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';

const ConversationAvatar = ({ conversation, size, status = statusUser.OFFLINE }) => {
    console.log('🚀 ~ ConversationAvatar ~ conversation:', conversation);
    const { user } = useSelector((state) => state.user);

    if (!conversation?._id) return null;

    if (conversation.isGroup) {
        console.log(conversation.picture);

        if (conversation.picture)
            return <Avatar status={status} src={conversation.picture} size={size} alt={conversation.name} />;

        const avatars = getAvatarsGroup(conversation.users);
        console.log('🚀 ~ ConversationAvatar ~ avatars:', avatars);

        return <AvatarGroup status={status} avatars={avatars} size={size} />;
    }

    const otherUser = getOtherUserInIndividual(conversation.users, user._id);
    console.log('🚀 ~ ConversationAvatar ~ otherUser:', otherUser);

    return <Avatar status={status} src={otherUser.avatar} size={size} alt={otherUser.name} />;
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
