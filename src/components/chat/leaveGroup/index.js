import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '~/components/modal';
import Switch from '~/components/switch';
import { groupRole, messageNotificationType } from '~/constants';
import { removeConversation } from '~/features/chats/chatsSlice';
import { removeGroup } from '~/features/contactGroups/contactGroupsSlice';
import { useSendMessage } from '~/hooks';
import groupServices from '~/services/group.service';
import messageServices from '~/services/message.service';

const LeaveGroup = ({ newOwnerId, show, onClickOutside }) => {
    const { t } = useTranslation();
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const [leaveInSilence, setLeaveInSilence] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { handleSendNotificationMessage } = useSendMessage();

    const handleLeave = useCallback(async () => {
        if (!active?._id || !user?._id) return;

        try {
            setLoading(true);
            if (newOwnerId) {
                const [, message] = await Promise.all([
                    groupServices.addRole({
                        params: [active._id, newOwnerId],
                        data: {
                            role: groupRole.OWNER_ROLE,
                        },
                    }),
                    messageServices.addMessageNotification({
                        conversationId: active._id,
                        userIds: [newOwnerId],
                        type: messageNotificationType.CHANGE_OWNER,
                    }),
                ]);

                handleSendNotificationMessage(message);
            }

            const [res, message] = await Promise.all([
                groupServices.leaveGroup({
                    params: [active._id, user._id],
                }),
                messageServices.addMessageNotification({
                    conversationId: active._id,
                    type: messageNotificationType.LEAVE_GROUP,
                }),
            ]);
            console.log('🚀 ~ handleLeave ~ message:', message);

            socket.emit('addOrUpdateConversation', {
                conversation: res.data,
                userIds: res.data.users.map((user) => user._id),
            });
            handleSendNotificationMessage(message);

            dispatch(removeConversation(active._id));
            dispatch(removeGroup(active._id));
            toast.success(t('group.leave.notification-successfully'));
        } catch (error) {
            console.error(error);

            toast.error(t('request-error'));
        } finally {
            setLoading(false);
            onClickOutside();
        }
    }, [active._id, user._id, newOwnerId, socket, dispatch, t, handleSendNotificationMessage, onClickOutside]);

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <Modal.Header onClose={onClickOutside}>{t('group.leave.title')}</Modal.Header>

            <div className="p-2 ex:p-3 sm:p-4">
                <p className="text-sm leading-normal">{t('group.leave.description')}</p>

                <div className="mt-3 px-4 py-3 rounded bg-[#f3f5f6] flex gap-[22px] items-center">
                    <div className="flex-1">
                        <p className="text-sm font-medium">{t('group.leave.leave-in-silence')}</p>
                        <p className="text-sm text-secondary dark:text-dark-secondary">
                            {t('group.leave.leave-in-silence-description')}
                        </p>
                    </div>
                    <Switch checked={leaveInSilence} onChange={setLeaveInSilence} />
                </div>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button disabled={loading} onClick={onClickOutside} type="text-primary">
                    {t('group.leave.cancel')}
                </Modal.Button>
                <Modal.Button disabled={loading} loading={loading} type="danger" onClick={handleLeave}>
                    {t('group.leave.leave')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

LeaveGroup.propTypes = {
    newOwnerId: PropTypes.string,
    show: PropTypes.bool,
    onClickOutside: PropTypes.func,
};

export default LeaveGroup;
