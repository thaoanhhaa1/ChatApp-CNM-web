import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import List from '~/components/list';
import ReceivedFriendRequest from '~/components/receivedFriendRequest';
import ReceivedFriendRequestSkeleton from '~/components/receivedFriendRequest/ReceivedFriendRequestSkeleton';
import { classNames } from '~/utils';

const ReceivedTab = ({ className }) => {
    // const { receivedFriendRequests } = useSelector((state) => state.receivedFriendRequests);
    const { friendRequestLoading, friendReceived } = useSelector((state) => state.friend);

    return (
        <div className={classNames(className)}>
            {friendRequestLoading && <List control={ReceivedFriendRequestSkeleton} length={3} />}
            {friendReceived.map((contact) => (
                <ReceivedFriendRequest key={contact._id} contact={contact} />
            ))}
        </div>
    );
};

ReceivedTab.propTypes = {
    className: PropTypes.string,
};

export default ReceivedTab;
