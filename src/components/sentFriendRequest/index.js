import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDate } from '~/utils';
import Avatar from '../avatar';
import Button from '../button';

const SentFriendRequest = ({ contact }) => {
    const { t } = useTranslation();
    const [isRecall, setRecall] = useState(false);

    const handleClick = () => {
        setRecall(!isRecall);
    };

    return (
        <div className="px-2 ex:px-3 sm:px-4 py-2 flex gap-2 items-center">
            <Avatar src={contact.avatar} />
            <div className="flex-1">
                <div className="text-sm font-medium line-clamp-1">{contact.name}</div>
                <span className="text-ss text-secondary dark:text-dark-secondary">
                    {getDate(new Date(contact.date))}
                </span>
            </div>
            <Button onClick={handleClick} primary={!isRecall} secondary={isRecall} small rounded>
                {t(`contacts.friend-request.${isRecall ? 'recall' : 'add-friend'}`)}
            </Button>
        </div>
    );
};

SentFriendRequest.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default SentFriendRequest;
