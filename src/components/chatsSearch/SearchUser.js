import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLayout } from '~/context';
import { classNames, isUserInConversation } from '~/utils';
import Avatar from '../avatar';

// FIXME Active when user show in chat
const SearchUser = ({ user, control, onClick = () => {} }) => {
    const { active } = useSelector((state) => state.chats);
    const existUser = isUserInConversation(active, user._id);
    const { setShowChat } = useLayout();

    const handleClick = () => {
        onClick();
        setShowChat(true);
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 py-2 flex items-center gap-3 group/recent-search cursor-pointer bg-transparent hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors',
                existUser && 'bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5',
            )}
        >
            <Avatar src={user.avatar} size="48px" />
            <div className="flex-1 line-clamp-1">{user.alias || user.name}</div>
            <div onClick={(e) => e.stopPropagation()}>{control}</div>
        </div>
    );
};

SearchUser.propTypes = {
    user: PropTypes.object.isRequired,
    control: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default SearchUser;
