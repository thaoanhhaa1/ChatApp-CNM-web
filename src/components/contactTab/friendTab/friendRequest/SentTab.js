import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import List from '~/components/list';
import SentFriendRequest from '~/components/sentFriendRequest';
import SentFriendRequestSkeleton from '~/components/sentFriendRequest/SentFriendRequestSkeleton';
import { classNames } from '~/utils';
import RequestEmpty from './RequestEmpty';

const SentTab = ({ className }) => {
    // const { sentFriendRequests } = useSelector((state) => state.sentFriendRequests);
    const { t } = useTranslation();
    const { friendRequestLoading, friendSent } = useSelector((state) => state.friend);

    return (
        <div className={classNames(className)}>
            {friendRequestLoading && <List control={SentFriendRequestSkeleton} length={3} />}
            {friendSent.map((contact) =>
                contact.receiver_id ? <SentFriendRequest key={contact._id} contact={contact} /> : null,
            )}
            {!friendRequestLoading && friendSent.length === 0 ? (
                <RequestEmpty title={t('contacts.friend-request.empty-friend-sent')} />
            ) : null}
        </div>
    );
};

SentTab.propTypes = {
    className: PropTypes.string,
};

export default SentTab;
