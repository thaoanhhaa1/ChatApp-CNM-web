import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChatAndActive } from '~/features/chats/chatsSlice';
import { getDateTimeContactGroup } from '~/utils';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';
import ChatItemMessage from '../chatItemMessage';

const ContactGroupItem = ({ group }) => {
    const avatars = useMemo(() => group.users.map((user) => user.avatar), [group.users]);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    const handleClickGroup = () => {
        dispatch(addChatAndActive(group));

        socket.emit('openConversation', {
            conversation: group,
            user,
        });
    };

    return (
        <div
            onClick={handleClickGroup}
            className="flex gap-2.5 items-center p-2.5 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-300 rounded-md cursor-pointer"
        >
            {group.picture ? <Avatar src={group.picture} /> : <AvatarGroup avatars={avatars} />}
            <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium line-clamp-1">{group.name}</div>
                    <span className="text-xs font-medium">{getDateTimeContactGroup(group.updatedAt)}</span>
                </div>
                {group.lastMessage ? <ChatItemMessage chat={group} /> : null}
            </div>
        </div>
    );
};

ContactGroupItem.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        users: PropTypes.arrayOf(
            PropTypes.shape({
                avatar: PropTypes.string,
            }),
        ).isRequired,
    }).isRequired,
};

export default ContactGroupItem;
