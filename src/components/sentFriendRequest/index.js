import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDate } from '~/utils';
import Avatar from '../avatar';
import Button from '../button';

const SentFriendRequest = ({ contact }) => {
    const { t } = useTranslation();
    const [isRecall, setRecall] = useState(true);
    const receiver = contact.receiver_id;

    const handleClick = () => {
        setRecall(!isRecall);

        // TODO handle recall or add friend
        console.log('handle recall or add friend');
    };

    return (
        <div className="px-2 ex:px-3 sm:px-4 py-2 flex gap-2 items-center">
            <Avatar src={receiver.avatar} />
            <div className="flex-1">
                <div className="text-sm font-medium line-clamp-1">{receiver.name}</div>
                <span className="text-ss text-secondary dark:text-dark-secondary">{getDate(contact.createdAt)}</span>
            </div>
            <Button onClick={handleClick} primary={!isRecall} secondary={isRecall} small rounded>
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

export default SentFriendRequest;
