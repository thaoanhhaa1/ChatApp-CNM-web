import PropTypes from 'prop-types';
import Checkbox from '~/components/checkbox';
import ConversationAvatar from '../conversationAvatar';

const GroupItem = ({ checked, group, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer px-2 h-[52px] flex items-center gap-2 hover:bg-black hover:bg-opacity-5 rounded-md transition-colors duration-300"
        >
            <Checkbox rounded checked={checked} />
            <ConversationAvatar conversation={group} />
            <div className="flex-1 text-sm line-clamp-1">{group?.name}</div>
        </div>
    );
};

GroupItem.propTypes = {
    group: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
};

export default GroupItem;
