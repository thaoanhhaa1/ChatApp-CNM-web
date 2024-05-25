import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend } from '~/features/addContact/addContactSlice';
import { updateRequestFriendSent } from '~/features/friend/friendSlice';
import { setToast } from '~/features/toastAll/toastAllSlice';
import friendServices from '~/services/friend.service';
import { getDate } from '~/utils';
import Avatar from '../avatar';
import Button from '../button';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const SentFriendRequest = ({ contact }) => {
    const { t } = useTranslation();
    const [isRecall, setRecall] = useState(true);
    const receiver = contact.receiver_id;
    const [recallLoading, setRecallLoading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    const handleClick = async () => {
        setRecallLoading(true);

        try {
            if (isRecall) {
                // Handle recall
                await friendServices.revocationRequestFriend(contact.receiver_id._id);

                socket.emit('revocationRequestFriend', {
                    _id: contact._id,
                    senderId: contact.receiver_id._id,
                });
            } else {
                // Handle add friend
                const res = await dispatch(
                    addFriend({
                        friendId: contact.receiver_id._id,
                        message: `${t('friend.default-message-friend-request-1')} ${user.name}. ${t(
                            'friend.default-message-friend-request-2',
                        )}`,
                    }),
                ).unwrap();

                socket.emit('sendFriendRequest', {
                    ...res.data,
                    receiver_id: res.data.receiver_id._id,
                    sender_id: user,
                });

                dispatch(
                    updateRequestFriendSent({
                        _id: contact._id,
                        newRequest: res.data,
                    }),
                );
            }
            setRecall(!isRecall);
        } catch (error) {
            dispatch(setToast('There were a few errors, please try again'));
        } finally {
            setRecallLoading(false);
        }
    };

    return (
        <div className="px-2 ex:px-3 sm:px-4 py-2 flex gap-2 items-center">
            <Avatar src={receiver.avatar} />
            <div className="flex-1">
                <div className="text-sm font-medium line-clamp-1">{receiver.name}</div>
                <span className="text-ss text-secondary dark:text-dark-secondary">{getDate(contact.createdAt)}</span>
            </div>
            <Button
                disabled={recallLoading}
                loading={recallLoading}
                onClick={handleClick}
                primary={!isRecall}
                secondary={isRecall}
                small
                rounded
            >
                {t(`contacts.friend-request.${isRecall ? 'recall' : 'add-friend'}`)}
            </Button>
        </div>
    );
};

SentFriendRequest.propTypes = {
    contact: PropTypes.shape({
        message: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        receiver_id: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default withErrorBoundary(SentFriendRequest, {
    fallback: null,
    onError: (error, info) => {
        toast.error('SentFriendRequest::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
