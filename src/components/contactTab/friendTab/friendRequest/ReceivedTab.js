import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import List from '~/components/list';
import ReceivedFriendRequest from '~/components/receivedFriendRequest';
import ReceivedFriendRequestSkeleton from '~/components/receivedFriendRequest/ReceivedFriendRequestSkeleton';
import { classNames } from '~/utils';
import RequestEmpty from './RequestEmpty';

const ReceivedTab = ({ className }) => {
    const { t } = useTranslation();
    const { friendRequestLoading, friendReceived } = useSelector((state) => state.friend);

    return (
        <div className={classNames(className)}>
            {friendRequestLoading && <List control={ReceivedFriendRequestSkeleton} length={3} />}
            {friendReceived.map((contact) => (
                <ReceivedFriendRequest key={contact._id} contact={contact} />
            ))}
            {!friendRequestLoading && friendReceived.length === 0 ? (
                <RequestEmpty title={t('contacts.friend-request.empty-friend-received')} />
            ) : null}
        </div>
    );
};

ReceivedTab.propTypes = {
    className: PropTypes.string,
};

export default ReceivedTab;
