import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, setActive } from '~/features/chats/chatsSlice';
import ConversationAvatar from '../conversationAvatar';

const InvitedGroup = ({ conversation, onClose }) => {
    const { chats, active } = useSelector((state) => state.chats);
    const dispatch = useDispatch();

    const handleClick = async () => {
        if (conversation._id === active._id) {
        } else {
            const chat = chats.find((chat) => chat._id === conversation._id);

            if (chat) dispatch(setActive(chat));
            else {
                const chat = await dispatch(getConversation(conversation._id)).unwrap();

                dispatch(setActive(chat));
            }
        }

        onClose();
    };

    return (
        <div
            onClick={handleClick}
            className="px-5 py-2.5 flex items-center gap-3 hover:bg-primary-color hover:bg-opacity-5 cursor-pointer transition-all"
        >
            <ConversationAvatar conversation={conversation} size="40px" />
            <span className="flex-1 line-clamp-1 text-sm font-medium">{conversation.name}</span>
        </div>
    );
};

InvitedGroup.propTypes = {
    conversation: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default InvitedGroup;
