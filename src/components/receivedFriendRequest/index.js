import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ReactShowMoreText from 'react-show-more-text';
import { removeReceivedFriendRequest } from '~/features/receivedFriendRequests/receivedFriendRequestsSlice';
import { getDateFriendRequest } from '~/utils';
import Avatar from '../avatar';
import Button from '../button';

const ReceivedFriendRequest = ({ contact }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleDecline = () => {
        console.log('handleDecline');
        dispatch(removeReceivedFriendRequest(contact.id));
    };
    const handleAccept = () => {
        console.log('handleAccept');
        dispatch(removeReceivedFriendRequest(contact.id));
    };

    return (
        <div className="flex gap-2 px-4 py-2">
            <Avatar src={contact.avatar} containerClassName="flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
                <div>
                    <div className="text-sm font-medium">{contact.name}</div>
                    <span className="text-ss text-secondary dark:text-dark-secondary">
                        {getDateFriendRequest(new Date(contact.date))}
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
                    <Button onClick={handleDecline} small rounded secondary>
                        {t('contacts.friend-request.decline')}
                    </Button>
                    <Button onClick={handleAccept} small rounded primary>
                        {t('contacts.friend-request.accept')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

ReceivedFriendRequest.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
};

export default ReceivedFriendRequest;
