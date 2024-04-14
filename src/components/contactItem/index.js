import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BlockLineIcon, DeleteBinLineIcon, More2FillIcon, PhoneLineIcon, ShareLineIcon, VideoLineIcon } from '~/assets';
import Avatar from '~/components/avatar';
import Popup from '~/components/popup';
import { removeFriend } from '~/features/friend/friendSlice';
import { setToast } from '~/features/toastAll/toastAllSlice';
import friendServices from '~/services/friend.service';
import Button from './Button';

const ContactItem = ({ contact }) => {
    const { t } = useTranslation();
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleRemoveFriend = async () => {
        try {
            await friendServices.deleteFriend(contact._id);

            socket.emit('deleteFriend', {
                senderId: user._id,
                receiverId: contact._id,
            });
            dispatch(removeFriend({ _id: contact._id }));
            dispatch(setToast(t('friend.notification-friend-removed-successfully')));
        } catch (error) {
            console.error(error);
            dispatch(setToast(t('friend.notification-friend-removed-failed')));
        }
    };

    const more = [
        {
            title: t('contacts.share'),
            icon: ShareLineIcon,
            onClick: () => console.log('handleShare'),
        },
        {
            title: t('contacts.block'),
            icon: BlockLineIcon,
        },
        {
            title: t('contacts.remove'),
            icon: DeleteBinLineIcon,
            onClick: handleRemoveFriend,
        },
    ];

    const handleCallAudio = () => console.log('handleCallAudio');
    const handleCallVideo = () => console.log('handleCallVideo');

    return (
        <div className="p-1.5 sm:p-2.5 flex items-center gap-2 cursor-pointer hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors duration-300 rounded-md">
            <Avatar src={contact.avatar} />
            <div className="text-sm font-semibold flex-1 line-clamp-1">{contact.name}</div>
            <div className="flex items-center">
                <Button Icon={PhoneLineIcon} onClick={handleCallAudio} />
                <Button Icon={VideoLineIcon} onClick={handleCallVideo} />
                <Popup data={more} placement="bottom-end" animation="shift-toward" offset={[0, 0]}>
                    <Button Icon={More2FillIcon} />
                </Popup>
            </div>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem;
