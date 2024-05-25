import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import List from '~/components/list';
import SentFriendRequest from '~/components/sentFriendRequest';
import SentFriendRequestSkeleton from '~/components/sentFriendRequest/SentFriendRequestSkeleton';
import { classNames } from '~/utils';
import RequestEmpty from './RequestEmpty';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const SentTab = ({ className }) => {
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

export default withErrorBoundary(SentTab, {
    fallback: null,
    onError: (error, info) => {
        toast.error('SentTab::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
