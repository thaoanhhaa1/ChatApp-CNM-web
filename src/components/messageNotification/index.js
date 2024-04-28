import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import images from '~/assets/images';
import { messageNotificationType } from '~/constants';
import AcceptFriendNotification from './AcceptFriendNotification';
import AddUsersNotification from './AddUsersNotification';
import CommonNotification from './CommonNotification';
import InviteToGroupNotification from './InviteToGroupNotification';
import RemoveUserNotification from './RemoveUserNotification';
import TogglePinMessageNotification from './TogglePinMessageNotification';
import Wrapper from './Wrapper';

const MessageNotification = ({ message }) => {
    const { t } = useTranslation();
    const notification = message?.notification;

    if (!notification) return null;

    if (notification.type === messageNotificationType.ACCEPT_FRIEND)
        return <AcceptFriendNotification sender={message.sender} />;

    if (notification.type === messageNotificationType.INVITE_TO_GROUP)
        return (
            <InviteToGroupNotification
                sender={message.sender}
                users={notification.users}
                conversations={notification.conversations}
            />
        );

    return (
        <Wrapper>
            {notification.type === messageNotificationType.ADD_USERS && (
                <AddUsersNotification users={notification.users} sender={message.sender} />
            )}
            {notification.type === messageNotificationType.REMOVE_USER && (
                <RemoveUserNotification user={notification.users[0]} sender={message.sender} />
            )}
            {notification.type === messageNotificationType.ADD_ADMIN && (
                <CommonNotification
                    img={images.chatTipIconKey}
                    data={[notification.users, t('message-notification.add-admin')]}
                />
            )}
            {notification.type === messageNotificationType.REMOVE_ADMIN && (
                <CommonNotification
                    img={images.chatTipIconKeyDel}
                    data={[notification.users, t('message-notification.remove-admin')]}
                />
            )}
            {notification.type === messageNotificationType.LEAVE_GROUP && (
                <CommonNotification
                    img={message.sender.avatar}
                    data={[[message.sender], t('message-notification.leave-group')]}
                />
            )}
            {[messageNotificationType.PIN_MESSAGE, messageNotificationType.UNPIN_MESSAGE].includes(
                notification.type,
            ) && <TogglePinMessageNotification type={notification.type} message={message} />}
            {notification.type === messageNotificationType.CHANGE_OWNER && (
                <CommonNotification
                    img={images.chatPrimaryKey}
                    data={[
                        [message.sender],
                        t('message-notification.change-owner-group-1'),
                        notification.users,
                        t('message-notification.change-owner-group-2'),
                    ]}
                />
            )}
        </Wrapper>
    );
};

MessageNotification.propTypes = {
    message: PropTypes.object,
};

export default MessageNotification;
