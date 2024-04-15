import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { MoreFillIcon } from '~/assets';
import { groupRole } from '~/constants';
import { useChat } from '~/context';
import { addOrUpdateChat, removeConversation } from '~/features/chats/chatsSlice';
import { addOrUpdateGroup, removeGroup } from '~/features/contactGroups/contactGroupsSlice';
import { useBoolean } from '~/hooks';
import groupServices from '~/services/group.service';
import Avatar from '../avatar';
import RemoveMember from '../chat/removeMember';
import Popup from '../popup';

const Member = ({ user }) => {
    const { t } = useTranslation();
    const { myRole } = useChat();
    const { user: me } = useSelector((state) => state.user);
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const { value: showRemoveUser, setTrue: handleShowRemoveUser, setFalse: handleHideRemoveUser } = useBoolean(false);
    const role = useMemo(() => {
        if (active.admin === user._id) return groupRole.OWNER_ROLE;
        if (active.deputy.includes(user._id)) return groupRole.ADMIN_ROLE;

        return groupRole.MEMBER_ROLE;
    }, [active.admin, active.deputy, user._id]);

    // TODO leave group --> Model
    const handleLeave = useCallback(async () => {
        if (!active?._id || !me?._id) return;

        const res = await groupServices.leaveGroup({
            params: [active._id, me._id],
        });

        socket.emit('addOrUpdateConversation', {
            conversation: res.data,
            userIds: res.data.users.map((user) => user._id),
        });

        dispatch(removeConversation(active._id));
        dispatch(removeGroup(active._id));
    }, [active?._id, dispatch, me?._id, socket]);

    const handleToggleRole = useCallback(async () => {
        const res = await groupServices[role === groupRole.MEMBER_ROLE ? 'addRole' : 'removeRole']({
            params: [active._id, user._id],
            data: {
                role: 'admin',
            },
        });

        socket.emit('addOrUpdateConversation', {
            conversation: res.data,
            userIds: res.data.users.map((user) => user._id),
        });
        dispatch(addOrUpdateChat(res.data));
        dispatch(addOrUpdateGroup(res.data));
    }, [active._id, dispatch, role, socket, user._id]);

    const more = useMemo(() => {
        if (!me?._id || !user?._id) return [];

        const more = [];

        if (user._id !== me._id) {
            if (myRole !== groupRole.MEMBER_ROLE)
                more.unshift({
                    title: t('group.user-more.remove-user'),
                    onClick: handleShowRemoveUser,
                });
            if (myRole === groupRole.OWNER_ROLE)
                more.unshift({
                    title: t(`group.user-more.${role === groupRole.ADMIN_ROLE ? 'remove-admin' : 'add-admin'}`),
                    onClick: handleToggleRole,
                });
        } else
            more.push({
                title: t('group.user-more.leave'),
                onClick: handleLeave,
            });

        return more;
    }, [handleLeave, handleShowRemoveUser, handleToggleRole, me?._id, myRole, role, t, user?._id]);

    return (
        <div className="group/member p-2 flex gap-2 items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors cursor-pointer rounded-md">
            <Avatar src={user.avatar} containerClassName="flex-shrink-0" />
            <div className="flex-1 flex-shrink-0 flex items-center gap-2">
                <h5 className="text-sm font-semibold line-clamp-1">{user.name}</h5>
                {user.role && (
                    <span className="capitalize block px-1.5 py-[2px] rounded text-ex text-[#ef476f] bg-[rgba(239,71,111,.18)]">
                        {user.role}
                    </span>
                )}
            </div>
            {more.length ? (
                <Popup placement="bottom-end" data={more}>
                    <span className="w-8 h-8 flex justify-center items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors rounded-md opacity-0 group-hover/member:opacity-100">
                        <MoreFillIcon className="w-5 h-5" />
                    </span>
                </Popup>
            ) : null}

            <RemoveMember show={showRemoveUser} onClickOutside={handleHideRemoveUser} userId={user._id} />
        </div>
    );
};

Member.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Member;
