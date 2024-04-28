import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const UserTag = ({ user }) => {
    const { t } = useTranslation();
    const { user: currentUser } = useSelector((state) => state.user);

    if (currentUser._id === user._id) return t('message-notification.you');

    const handleClick = () => console.log('UserTag clicked');

    return (
        <span className="cursor-pointer font-medium" onClick={handleClick}>
            {user.name}
        </span>
    );
};

UserTag.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserTag;
