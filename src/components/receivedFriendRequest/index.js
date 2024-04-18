import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ReactShowMoreText from 'react-show-more-text';
import { toast } from 'react-toastify';
import { acceptFriendReceived, rejectFriendReceived } from '~/features/friend/friendSlice';
import { setToast } from '~/features/toastAll/toastAllSlice';
import friendServices from '~/services/friend.service';
import { getDate } from '~/utils';
import Avatar from '../avatar';
import Button from '../button';

const ReceivedFriendRequest = ({ contact }) => {
    const { t } = useTranslation();
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const sender = contact.sender_id;
    const dispatch = useDispatch();
    const [declineLoading, setDeclineLoading] = useState(false);
    const [acceptLoading, setAcceptLoading] = useState(false);

    const handleDecline = async () => {
        setDeclineLoading(true);

        try {
            await friendServices.rejectFriend(sender._id);

            socket.emit('rejectFriend', { _id: contact._id, senderId: sender._id });
            dispatch(rejectFriendReceived(contact._id));
            dispatch(setToast(t('friend.decline-friend')));
        } catch (error) {
            console.error(error);
        } finally {
            setDeclineLoading(false);
        }
    };
    const handleAccept = async () => {
        console.log('handleAccept');
        setAcceptLoading(true);

        try {
            await friendServices.acceptFriend(sender._id);

            socket.emit('acceptFriend', { _id: contact._id, user, senderId: sender._id });
            dispatch(acceptFriendReceived({ _id: contact._id, user: sender }));
            dispatch(setToast(t('friend.accept-friend')));
        } catch (error) {
            console.error(error);
            toast.error(t('request-error'));
        } finally {
            setAcceptLoading(false);
        }
    };

    return (
        <div className="flex gap-2 px-2 ex:px-3 sm:px-4 py-2">
            <Avatar src={sender.avatar} containerClassName="flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
                <div>
                    <div className="text-sm font-medium line-clamp-1">{sender.name}</div>
                    <span className="text-ss text-secondary dark:text-dark-secondary">
                        {getDate(new Date(contact.createdAt))}
                    </span>
                </div>
                <ReactShowMoreText
                    lines={2}
                    more={t('contacts.friend-request.see-more')}
                    less={t('contacts.friend-request.see-less')}
                    className="p-2 rounded-md border border-separate dark:border-dark-separate text-ss text-secondary dark:text-dark-secondary"
                    anchorClass="cursor-pointer font-medium text-[#7a7f9a] dark:text-[#abb4d2]"
                    expanded={false}
                    truncatedEndingComponent="..."
                >
                    {contact.message}
                </ReactShowMoreText>
                <div className="flex gap-2">
                    <Button
                        disabled={acceptLoading || declineLoading}
                        loading={declineLoading}
                        onClick={handleDecline}
                        small
                        rounded
                        secondary
                    >
                        {t('contacts.friend-request.decline')}
                    </Button>
                    <Button
                        disabled={acceptLoading || declineLoading}
                        loading={acceptLoading}
                        onClick={handleAccept}
                        small
                        rounded
                        primary
                    >
                        {t('contacts.friend-request.accept')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

ReceivedFriendRequest.propTypes = {
    contact: PropTypes.shape({
        message: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        sender_id: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

export default ReceivedFriendRequest;
