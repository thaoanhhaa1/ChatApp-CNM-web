import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Avatar from '../avatar';
import Button from '../button';

const PhoneBookItem = ({ contact, onAdd = () => {}, onRecall = () => {} }) => {
    const { t } = useTranslation();

    return (
        <div className="px-2 sm:px-4 py-1.5 sm:py-2 flex gap-2 items-center">
            <Avatar src={contact.avatar} />
            <div className="flex-1">
                <h6 className="text-sm font-medium line-clamp-1">{contact.alias || contact.name}</h6>
                {contact.alias && (
                    <span className="text-ss text-secondary dark:text-dark-secondary line-clamp-1">{contact.name}</span>
                )}
            </div>
            {!contact.isFriend && !contact.isSentRequest && (
                <Button onClick={onAdd} primary small rounded>
                    {t('contacts.friend-request.add-friend')}
                </Button>
            )}
            {!contact.isFriend && contact.isSentRequest && (
                <Button onClick={onRecall} secondary small rounded>
                    {t('contacts.friend-request.recall')}
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
        id: PropTypes.string.isRequired,
    }).isRequired,
    onAdd: PropTypes.func,
    onRecall: PropTypes.func,
};

export default PhoneBookItem;
