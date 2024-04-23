import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { statusUser } from '~/constants';
import { setActive } from '~/features/chats/chatsSlice';
import Avatar from '../avatar';

const OnlineUser = ({ data }) => {
    const { chats } = useSelector((state) => state.chats);
    const dispatch = useDispatch();

    const handleClick = () => {
        const chat = chats.find((chat) => {
            if (chat.isGroup) return false;

            const index = chat.users.findIndex((user) => user._id === data._id);

            return index !== -1;
        });

        if (chat) dispatch(setActive(chat));
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer flex-shrink-0 select-none mt-[18px] flex flex-col items-center gap-1 w-[71px] h-[51px] p-2 bg-light dark:bg-dark-separate rounded-lg"
        >
            <Avatar containerClassName="-mt-[18px]" src={data.avatar} status={statusUser.ONLINE} />
            <h5 className="line-clamp-1 text-ss font-medium">{data.name}</h5>
        </div>
    );
};

OnlineUser.propTypes = {
    data: PropTypes.object.isRequired,
};

export default OnlineUser;
