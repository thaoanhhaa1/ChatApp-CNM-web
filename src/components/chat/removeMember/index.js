import PropTypes from 'prop-types';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Checkbox from '~/components/checkbox';
import Modal from '~/components/modal';
import { messageNotificationType } from '~/constants';
import { addOrUpdateChat } from '~/features/chats/chatsSlice';
import { addOrUpdateGroup } from '~/features/contactGroups/contactGroupsSlice';
import { useSendMessage } from '~/hooks';
import groupServices from '~/services/group.service';
import messageServices from '~/services/message.service';

const RemoveMember = ({ userId, show, onClickOutside }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const { handleSendNotificationMessage } = useSendMessage();

    const handleRemoveMember = async () => {
        setLoading(true);

        try {
            const [res, message] = await Promise.all([
                groupServices.removeUser({
                    params: [active._id, userId],
                    data: {
                        params: {
                            blockRejoin: checked,
                        },
                    },
                }),
                messageServices.addMessageNotification({
                    conversationId: active._id,
                    userIds: [userId],
                    type: messageNotificationType.REMOVE_USER,
                }),
            ]);

            socket.emit('addOrUpdateConversation', {
                conversation: res.data,
                userIds: res.data.users.map((user) => user._id),
            });
            socket.emit('removeUserFromConversation', { conversationId: active._id, userId });
            handleSendNotificationMessage(message);

            dispatch(
                addOrUpdateChat({
                    ...res.data,
                    myId: user._id,
                }),
            );
            dispatch(addOrUpdateGroup(res.data));
            onClickOutside();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <Modal.Header onClose={onClickOutside}>{t('group.remove-member.title')}</Modal.Header>

            <div className="px-4 pt-[14px] pb-2 text-sm">
                <p>{t('group.remove-member.description')}</p>
                <label className="inline-flex gap-2 items-center mt-5 cursor-pointer">
                    <Checkbox checked={checked} onChange={setChecked} />
                    <span>{t('group.remove-member.block-rejoin')}</span>
                </label>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={onClickOutside} type="text-primary">
                    {t('group.remove-member.close')}
                </Modal.Button>
                <Modal.Button onClick={handleRemoveMember} disabled={loading} loading={loading}>
                    {t('group.remove-member.accept')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

RemoveMember.propTypes = {
    userId: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default withErrorBoundary(RemoveMember, {
    fallback: null,
    onError: (error, info) => {
        toast.error('RemoveMember::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
