import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { getDateTimeContactGroup } from '~/utils';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';
import { useDispatch } from 'react-redux';
import { addChatAndActive } from '~/features/chats/chatsSlice';

const ContactGroupItem = ({ group }) => {
    const avatars = useMemo(() => group.users.map((user) => user.avatar), [group.users]);
    const dispatch = useDispatch();

    const handleClickGroup = () => dispatch(addChatAndActive(group));

    return (
        <div
            onClick={handleClickGroup}
            className="flex gap-2.5 items-center p-2.5 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-300 rounded-md cursor-pointer"
        >
            {group.picture ? <Avatar src={group.picture} /> : <AvatarGroup avatars={avatars} />}
            <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium line-clamp-1">{group.name}</div>
                    <span className="text-xs font-medium">{getDateTimeContactGroup(group.createdAt)}</span>
                </div>
                <p className="line-clamp-1 text-ss text-secondary dark:text-dark-secondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident odio aperiam facilis maiores
                    ullam dicta iusto veniam sunt assumenda minima, fugit molestiae magnam numquam accusantium quia,
                    voluptate tenetur omnis pariatur!
                </p>
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
