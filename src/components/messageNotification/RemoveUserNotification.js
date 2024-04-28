import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Avatar from '../avatar';
import UserTag from './UserTag';

const RemoveUserNotification = ({ user, sender }) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Avatar src={user.avatar} size="24px" />
            <span className="first-letter:uppercase">
                <UserTag user={user} />
                &nbsp;
                {t('message-notification.remove-user.was')}
                {i18n.language === 'vn' && (
                    <>
                        &nbsp;
                        <UserTag user={sender} />
                    </>
                )}
                &nbsp;
                {t('message-notification.remove-user.title')}
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

RemoveUserNotification.propTypes = {
    user: PropTypes.object.isRequired,
    sender: PropTypes.object.isRequired,
};

export default RemoveUserNotification;
