import PropTypes from 'prop-types';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChatAndActive } from '~/features/chats/chatsSlice';
import { getDateTimeContactGroup } from '~/utils';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';
import ChatItemMessage from '../chatItemMessage';
import MessageNotification from '../messageNotification';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const ContactGroupItem = ({ group }) => {
    const avatars = useMemo(() => group.users.map((user) => user.avatar), [group.users]);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const [notificationMessage, setNotificationMessage] = useState(null);

    const handleClickGroup = () => {
        dispatch(
            addChatAndActive({
                ...group,
                myId: user._id,
            }),
        );

        socket.emit('openConversation', {
            conversation: group,
            user,
        });
    };

    useLayoutEffect(() => {
        const element = document.getElementById(group._id);

        if (element) {
            const text = element.innerText;

            setNotificationMessage(text.charAt(0).toUpperCase() + text.slice(1));
        } else setNotificationMessage(null);
    }, [group._id, group.lastMessage]);

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
                {group.lastMessage ? (
                    notificationMessage ? (
                        <p className="line-clamp-1 first-letter:uppercase text-sm text-secondary dark:text-dark-secondary">
                            {notificationMessage}
                        </p>
                    ) : (
                        <ChatItemMessage chat={group} />
                    )
                ) : null}
            </div>
            {(group?.lastMessage?.notification && (
                <div id={group._id} className="opacity-0 invisible select-none pointer-events-none hidden">
                    <MessageNotification message={group.lastMessage} />
                </div>
            )) ||
                null}
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

export default withErrorBoundary(ContactGroupItem, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ContactGroupItem::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
