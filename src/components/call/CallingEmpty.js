import { useSelector } from 'react-redux';
import ConversationAvatar from '../conversationAvatar';

const CallingEmpty = () => {
    const { sender, users, _id } = useSelector((state) => state.calling);
    const usersWithoutSender = users.filter((user) => user._id !== sender._id);

    return (
        <div className="flex flex-col absolute inset-0">
            {/* Header */}
            <div>
                <div>
                    <h5>{sender.name}</h5>
                    <p>Calling...</p>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex justify-center items-center">
                <ConversationAvatar
                    size="70px"
                    conversation={{
                        _id,
                        users,
                        isGroup: users.length > 2,
                    }}
                />
                <div>{usersWithoutSender.map((user) => user.name).join(', ')}</div>
            </div>

            {/* Footer */}
            <div className="flex justify-center items-center">
                <button>Cancel</button>
            </div>
        </div>
    );
};

CallingEmpty.propTypes = {};

export default CallingEmpty;
