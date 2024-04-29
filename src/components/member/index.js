import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MoreFillIcon } from '~/assets';
import { groupRole, messageNotificationType, statusUser } from '~/constants';
import { useChat } from '~/context';
import { addMessageHeadSocket, addOrUpdateChat } from '~/features/chats/chatsSlice';
import { addOrUpdateGroup } from '~/features/contactGroups/contactGroupsSlice';
import { addMessageSocket } from '~/features/messages/messagesSlice';
import { useBoolean } from '~/hooks';
import groupServices from '~/services/group.service';
import messageServices from '~/services/message.service';
import Avatar from '../avatar';
import ChangeOwnerRole from '../chat/changeOwnerRole';
import LeaveGroup from '../chat/leaveGroup';
import RemoveMember from '../chat/removeMember';
import Popup from '../popup';

const Member = ({ user }) => {
    const { t } = useTranslation();
    const { myRole } = useChat();
    const { user: me } = useSelector((state) => state.user);
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const { users } = useSelector((state) => state.onlineUsers);
    const dispatch = useDispatch();
    const { value: showRemoveUser, setTrue: handleShowRemoveUser, setFalse: handleHideRemoveUser } = useBoolean(false);
    const { value: showLeave, setTrue: handleShowLeave, setFalse: handleHideLeave } = useBoolean(false);
    const {
        value: showChangeOwner,
        setTrue: handleShowChangeOwner,
        setFalse: handleHideChangeOwner,
    } = useBoolean(false);
    const status = users.includes(user._id) ? statusUser.ONLINE : statusUser.OFFLINE;
    const role = useMemo(() => {
        if (active.admin === user._id) return groupRole.OWNER_ROLE;
        if (active.deputy.includes(user._id)) return groupRole.ADMIN_ROLE;

        return groupRole.MEMBER_ROLE;
    }, [active.admin, active.deputy, user._id]);
    const [checked, setChecked] = useState(() =>
        role === groupRole.OWNER_ROLE ? (active?.users || []).find((user) => user._id !== me._id)?._id : '',
    );

    const handleClickLeave = useCallback(() => {
        if (role === groupRole.OWNER_ROLE) return handleShowChangeOwner();
        handleShowLeave();
    }, [handleShowChangeOwner, handleShowLeave, role]);

    const handleToggleRole = useCallback(async () => {
        const isMember = role === groupRole.MEMBER_ROLE;

        const [res, message] = await toast.promise(
            Promise.all([
                groupServices[isMember ? 'addRole' : 'removeRole']({
                    params: [active._id, user._id],
                    data: {
                        role: 'admin',
                    },
                }),
                messageServices.addMessageNotification({
                    conversationId: active._id,
                    userIds: [user._id],
                    type: messageNotificationType[isMember ? 'ADD_ADMIN' : 'REMOVE_ADMIN'],
                }),
            ]),
            {
                pending: t('group.user-more.toggle-role-pending'),
                success: t(
                    isMember ? 'group.user-more.add-role-successfully' : 'group.user-more.remove-role-successfully',
                ),
                error: t('group.user-more.toggle-role-reject'),
            },
        );
        console.log('🚀 ~ handleToggleRole ~ message:', message);

        socket.emit('addOrUpdateConversation', {
            conversation: res.data,
            userIds: res.data.users.map((user) => user._id),
        });
        socket.emit('sendMessage', message.data);
        dispatch(addMessageSocket(message.data));
        dispatch(addMessageHeadSocket(message.data));
        dispatch(addOrUpdateChat(res.data));
        dispatch(addOrUpdateGroup(res.data));
    }, [active?._id, dispatch, role, socket, t, user?._id]);

    const handleContinueChangeOwnerRole = useCallback(() => {
        handleHideChangeOwner();
        handleShowLeave();
    }, [handleHideChangeOwner, handleShowLeave]);

    const handleChangeOwner = useCallback(async () => {
        const [res, message] = await toast.promise(
            Promise.all([
                groupServices.addRole({
                    params: [active._id, user._id],
                    data: {
                        role: groupRole.OWNER_ROLE,
                    },
                }),
                messageServices.addMessageNotification({
                    conversationId: active._id,
                    userIds: [user._id],
                    type: messageNotificationType.CHANGE_OWNER,
                }),
            ]),
            {
                pending: t('group.user-more.toggle-role-pending'),
                success: t('group.user-more.change-role-successfully'),
                error: t('group.user-more.toggle-role-reject'),
            },
        );
        console.log('🚀 ~ handleChangeOwner ~ message:', message);

        socket.emit('addOrUpdateConversation', {
            conversation: res.data,
            userIds: res.data.users.map((user) => user._id),
        });
        socket.emit('sendMessage', message.data);
        dispatch(addMessageSocket(message.data));
        dispatch(addMessageHeadSocket(message.data));

        dispatch(addOrUpdateChat(res.data));
    }, [active._id, dispatch, socket, t, user._id]);

    const more = useMemo(() => {
        if (!me?._id || !user?._id) return [];

        const more = [];

        if (user._id !== me._id) {
            if (myRole !== groupRole.MEMBER_ROLE)
                more.unshift({
                    title: t('group.user-more.remove-user'),
                    onClick: handleShowRemoveUser,
                });
            if (myRole === groupRole.OWNER_ROLE) {
                more.unshift({
                    title: t(`group.user-more.${role === groupRole.ADMIN_ROLE ? 'remove-admin' : 'add-admin'}`),
                    onClick: handleToggleRole,
                });
                more.unshift({
                    title: t('group.user-more.change-group-owner'),
                    onClick: handleChangeOwner,
                });
            }
        } else
            more.push({
                title: t('group.user-more.leave'),
                onClick: handleClickLeave,
            });

        return more;
    }, [
        handleChangeOwner,
        handleClickLeave,
        handleShowRemoveUser,
        handleToggleRole,
        me?._id,
        myRole,
        role,
        t,
        user?._id,
    ]);

    return (
        <div className="group/member p-2 flex gap-2 items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors cursor-pointer rounded-md">
            <Avatar status={status} src={user.avatar} containerClassName="flex-shrink-0" />
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
            {active?._id ? <LeaveGroup newOwnerId={checked} show={showLeave} onClickOutside={handleHideLeave} /> : null}
            {active?._id ? (
                <ChangeOwnerRole
                    checked={checked}
                    setChecked={setChecked}
                    onClickOutside={handleHideChangeOwner}
                    show={showChangeOwner}
                    onContinue={handleContinueChangeOwnerRole}
                />
            ) : null}
        </div>
    );
};

Member.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Member;
