import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Avatar from '../avatar';
import UserTag from './UserTag';

const RemoveUserNotification = ({ user, sender }) => {
    const { t, i18n } = useTranslation();
    const isVietnamese = i18n.language === 'vn';

    return (
        <>
            <Avatar src={user.avatar} size="24px" />
            <span className="first-letter:uppercase">
                <UserTag user={user} />
                &nbsp;
                {t('message-notification.remove-user.was')}
                {isVietnamese && (
                    <>
                        &nbsp;
                        <UserTag user={sender} />
                    </>
                )}
                &nbsp;
                {t('message-notification.remove-user.title')}
                {!isVietnamese && (
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
