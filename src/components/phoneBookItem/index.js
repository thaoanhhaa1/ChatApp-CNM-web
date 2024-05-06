import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FriendStatus } from '~/constants';
import Avatar from '../avatar';
import Button from '../button';

const PhoneBookItem = ({ contact, onAdd = () => {}, onRecall = () => {}, onAccept = () => {} }) => {
    const { t } = useTranslation();
    const { friendList, friendReceived, friendSent } = useSelector((state) => state.friend);
    const status = useMemo(() => {
        if (friendList.find((friend) => friend._id === contact._id)) return FriendStatus.FRIEND;
        if (friendReceived.find((friend) => friend.sender_id._id === contact._id)) return FriendStatus.RECEIVED;
        if (friendSent.find((friend) => friend.receiver_id._id === contact._id)) return FriendStatus.REQUESTED;
        return FriendStatus.NOT_FRIEND;
    }, [contact._id, friendList, friendReceived, friendSent]);

    return (
        <div className="px-2 sm:px-4 py-1.5 sm:py-2 flex gap-2 items-center">
            <Avatar src={contact.avatar} />
            <div className="flex-1">
                <h6 className="text-sm font-medium line-clamp-1">{contact.alias || contact.name}</h6>
                {contact.alias && (
                    <span className="text-ss text-secondary dark:text-dark-secondary line-clamp-1">{contact.name}</span>
                )}
            </div>
            {status === FriendStatus.NOT_FRIEND && (
                <Button onClick={onAdd} primary small rounded>
                    {t('contacts.friend-request.add-friend')}
                </Button>
            )}
            {status === FriendStatus.REQUESTED && (
                <Button onClick={onRecall} secondary small rounded>
                    {t('contacts.friend-request.recall')}
                </Button>
            )}
            {status === FriendStatus.RECEIVED && (
                <Button onClick={onAccept} primary small rounded>
                    {t('contacts.friend-request.accept')}
                </Button>
            )}
        </div>
    );
};

PhoneBookItem.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        alias: PropTypes.string.isRequired,
        isFriend: PropTypes.bool.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    onAdd: PropTypes.func,
    onRecall: PropTypes.func,
    onAccept: PropTypes.func,
};

export default PhoneBookItem;
