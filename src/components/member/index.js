import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MoreFillIcon } from '~/assets';
import { groupRole } from '~/constants';
import { useChat } from '~/context';
import { useBoolean } from '~/hooks';
import Avatar from '../avatar';
import RemoveMember from '../chat/removeMember';
import Popup from '../popup';

const Member = ({ user }) => {
    const { t } = useTranslation();
    const { myRole } = useChat();
    const { user: me } = useSelector((state) => state.user);
    const { value: showRemoveUser, setTrue: handleShowRemoveUser, setFalse: handleHideRemoveUser } = useBoolean(false);

    const more = useMemo(() => {
        const more = [];

        if (user._id !== me._id) {
            if (myRole !== groupRole.MEMBER_ROLE)
                more.unshift({
                    title: t('group.user-more.remove-user'),
                    onClick: handleShowRemoveUser,
                });
            if (myRole === groupRole.OWNER_ROLE)
                more.unshift({
                    title: t('group.user-more.add-admin'),
                });
        } else
            more.push({
                title: t('group.user-more.leave'),
            });

        return more;
    }, [handleShowRemoveUser, me._id, myRole, t, user._id]);

    return (
        <div className="p-2 flex gap-2 items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors cursor-pointer rounded-md">
            <Avatar src={user.avatar} containerClassName="flex-shrink-0" />
            <div className="flex-1 flex-shrink-0 flex items-center gap-2">
                <h5 className="text-sm font-semibold line-clamp-1">{user.name}</h5>
                {user.role && (
                    <span className="capitalize block px-1.5 py-[2px] rounded text-ex text-[#ef476f] bg-[rgba(239,71,111,.18)]">
                        {user.role}
                    </span>
                )}
            </div>
            <Popup placement="bottom-end" data={more}>
                <span className="w-8 h-8 flex justify-center items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors rounded-md">
                    <MoreFillIcon className="w-5 h-5" />
                </span>
            </Popup>

            <RemoveMember show={showRemoveUser} onClickOutside={handleHideRemoveUser} userId={user._id} />
        </div>
    );
};

Member.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Member;
