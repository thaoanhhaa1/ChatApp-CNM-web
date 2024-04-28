import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import getAvatarsGroup from '~/utils/getAvatarsGroup';
import Avatar from '../avatar';
import AvatarGroup from '../avatarGroup';
import UserTag from './UserTag';
import UsersTag from './UsersTag';

const AddUsersNotification = ({ users, sender }) => {
    const { t, i18n } = useTranslation();
    const avatars = getAvatarsGroup(users);
    const isPlural = users.length > 1;

    return (
        <>
            {isPlural ? <AvatarGroup avatars={avatars} size="24px" /> : <Avatar src={avatars[0]} size="24px" />}
            <span className="first-letter:uppercase">
                <UsersTag users={users} />
                &nbsp;
                {t(`message-notification.add-users.${isPlural ? 'were' : 'was'}`)}
                {i18n.language === 'vn' && (
                    <>
                        &nbsp;
                        <UserTag user={sender} />
                    </>
                )}
                &nbsp;
                {t(`message-notification.add-users.title`)}
                {i18n.language === 'en' && (
                    <>
                        &nbsp;
                        <UserTag user={sender} />
                    </>
                )}
            </span>
        </>
    );
};

AddUsersNotification.propTypes = {
    users: PropTypes.array.isRequired,
    sender: PropTypes.object.isRequired,
};

export default AddUsersNotification;
