import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SentFriendRequest from '~/components/sentFriendRequest';
import { classNames } from '~/utils';

const SentTab = ({ className }) => {
    const { sentFriendRequests } = useSelector((state) => state.sentFriendRequests);

    return (
        <div className={classNames(className)}>
            {sentFriendRequests.map((contact) => (
                <SentFriendRequest key={contact.id} contact={contact} />
            ))}
        </div>
    );
};

SentTab.propTypes = {
    className: PropTypes.string,
};

export default SentTab;
