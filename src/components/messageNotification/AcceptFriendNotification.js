import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import images from '~/assets/images';
import { getOtherUserInIndividual } from '~/utils';
import Avatar from '../avatar';
import UserTag from './UserTag';

const AcceptFriendNotification = ({ sender, conversation }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const otherUser = getOtherUserInIndividual(conversation.users, user._id);

    if (!conversation.users) return null;

    const [myAvatar, otherAvatar] =
        sender._id === user._id ? [user.avatar, otherUser.avatar] : [otherUser.avatar, user.avatar];

    return (
        <div className="px-2.5 w-[360px] rounded-xl bg-sidebar-sub-bg dark:bg-dark-sidebar-bg justify-self-center self-center">
            <div className="relative">
                <img src={images.artBoard} alt="" className="absolute" />
            </div>
            <div className="py-5">
                <div className="flex justify-center">
                    <Avatar src={myAvatar} size="56px" />
                    <Avatar containerClassName="-ml-[18px]" src={otherAvatar} size="56px" />
                </div>
                <p className="mt-[14px] font-medium first-letter:uppercase text-center">
                    <UserTag user={user} />
                    &nbsp;
                    {t('message-notification.and')}
                    &nbsp;
                    <UserTag user={otherUser} />
                    &nbsp;
                    {t('message-notification.accept-friend')}
                </p>
            </div>
        </div>
    );
};

AcceptFriendNotification.propTypes = {
    sender: PropTypes.object.isRequired,
};

export default AcceptFriendNotification;
