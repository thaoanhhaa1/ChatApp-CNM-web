import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useBoolean } from '~/hooks';
import InvitedGroups from './InvitedGroups';
import UserTag from './UserTag';
import UsersTag from './UsersTag';

const InviteToGroupNotification = ({ sender, users, conversations }) => {
    const { t } = useTranslation();
    const { value, setTrue, setFalse } = useBoolean(false);

    return (
        <div className="max-w-[482px] px-4 py-2 rounded-[10px] bg-sidebar-sub-bg dark:bg-dark-sidebar-bg justify-self-center self-center">
            <p className="text-sm first-letter:uppercase">
                <UserTag user={sender} />
                &nbsp;
                {t('message-notification.invite-to-group.invited')}
                &nbsp;
                <UsersTag users={users} />
                &nbsp;
                {t('message-notification.invite-to-group.to-group')}
                &nbsp;
                {conversations.map((conversation, index) => (
                    <Fragment key={conversation._id}>
                        {index > 0 && (
                            <span>
                                &nbsp;
                                {t('message-notification.and')}
                                &nbsp;
                            </span>
                        )}
                        <span className="font-medium">{conversation.name}</span>
                    </Fragment>
                ))}
            </p>
            <span onClick={setTrue} className="text-sm text-primary-color mt-1.5 cursor-pointer">
                {t('message-notification.invite-to-group.view-detail')}
            </span>

            <InvitedGroups conversations={conversations} show={value} onClickOutside={setFalse} />
        </div>
    );
};

InviteToGroupNotification.propTypes = {
    sender: PropTypes.object,
    users: PropTypes.array,
    conversations: PropTypes.array,
};

export default InviteToGroupNotification;
