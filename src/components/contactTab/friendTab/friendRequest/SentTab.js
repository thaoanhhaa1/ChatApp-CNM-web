import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import List from '~/components/list';
import SentFriendRequest from '~/components/sentFriendRequest';
import SentFriendRequestSkeleton from '~/components/sentFriendRequest/SentFriendRequestSkeleton';
import { classNames } from '~/utils';

const SentTab = ({ className }) => {
    // const { sentFriendRequests } = useSelector((state) => state.sentFriendRequests);
    const { friendRequestLoading, friendSent } = useSelector((state) => state.friend);

    return (
        <div className={classNames(className)}>
            {friendRequestLoading && <List control={SentFriendRequestSkeleton} length={3} />}
            {friendSent.map((contact) =>
                contact.receiver_id ? <SentFriendRequest key={contact._id} contact={contact} /> : null,
            )}
        </div>
    );
};

SentTab.propTypes = {
    className: PropTypes.string,
};

export default SentTab;
