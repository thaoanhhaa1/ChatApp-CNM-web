import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ReceivedFriendRequest from '~/components/receivedFriendRequest';
import { classNames } from '~/utils';

const ReceivedTab = ({ className }) => {
    const { receivedFriendRequests } = useSelector((state) => state.receivedFriendRequests);

    return (
        <div className={classNames(className)}>
            {receivedFriendRequests.map((contact) => (
                <ReceivedFriendRequest key={contact.id} contact={contact} />
            ))}
        </div>
    );
};

ReceivedTab.propTypes = {
    className: PropTypes.string,
};

export default ReceivedTab;
