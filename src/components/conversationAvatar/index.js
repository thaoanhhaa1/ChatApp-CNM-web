import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { statusUser } from '~/constants';
import { getOtherUserInIndividual } from '~/utils';
import getAvatarsGroup from '~/utils/getAvatarsGroup';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const ConversationAvatar = ({ conversation, size, status = statusUser.OFFLINE }) => {
    const { user } = useSelector((state) => state.user);

    if (!conversation?._id) return null;

    if (conversation.isGroup) {
        if (conversation.picture)
            return <Avatar status={status} src={conversation.picture} size={size} alt={conversation.name} />;

        const avatars = getAvatarsGroup(conversation.users);

        return <AvatarGroup status={status} avatars={avatars} size={size} />;
    }

    const otherUser = getOtherUserInIndividual(conversation.users, user._id);

    return (
        <Avatar
            status={status}
            src={otherUser?.avatar || process.env.REACT_APP_FALLBACK_AVATAR}
            size={size}
            alt={otherUser.name}
        />
    );
};

ConversationAvatar.propTypes = {
    conversation: PropTypes.shape({
        _id: PropTypes.string,
        isGroup: PropTypes.bool,
        users: PropTypes.array,
    }).isRequired,
    size: PropTypes.string,
};

export default withErrorBoundary(ConversationAvatar, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ConversationAvatar::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
