import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BlockLineIcon, DeleteBinLineIcon, More2FillIcon, PhoneLineIcon, ShareLineIcon, VideoLineIcon } from '~/assets';
import { callType } from '~/constants';
import { setCalling, setShowCalling } from '~/features/calling/callingSlice';
import Avatar from '../avatar';
import Popup from '../popup';
import Button from './Button';

const ContactItem = ({ contact }) => {
    const { t } = useTranslation();
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
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
        },
    ];

    const handleAcceptCall = useCallback(
        (type) => {
            if (!socket) return;

            const users = [contact, user];

            const _id = contact._id;
            socket.emit('call', {
                type,
                users,
                sender: user,
                _id,
                conversationName: contact.name,
                isGroup: false,
            });
            dispatch(setShowCalling());
            dispatch(setCalling({ _id, users, type, sender: user }));
        },
        [contact, dispatch, socket, user],
    );

    const handleCallAudio = () => handleAcceptCall(callType.AUDIO);
    const handleCallVideo = () => handleAcceptCall(callType.VIDEO);

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

export default withErrorBoundary(ContactItem, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ContactItem::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
