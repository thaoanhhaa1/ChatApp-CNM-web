import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '~/components/checkbox';
import Modal from '~/components/modal';
import { messageNotificationType } from '~/constants';
import { addMessageHeadSocket, addOrUpdateChat } from '~/features/chats/chatsSlice';
import { addOrUpdateGroup } from '~/features/contactGroups/contactGroupsSlice';
import { addMessageSocket } from '~/features/messages/messagesSlice';
import groupServices from '~/services/group.service';
import messageServices from '~/services/message.service';

const RemoveMember = ({ userId, show, onClickOutside }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

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
            console.log('🚀 ~ handleRemoveMember ~ message:', message);

            socket.emit('addOrUpdateConversation', {
                conversation: res.data,
                userIds: res.data.users.map((user) => user._id),
            });
            socket.emit('removeUserFromConversation', { conversationId: active._id, userId });
            socket.emit('sendMessage', message.data);
            dispatch(addMessageSocket(message.data));
            dispatch(addMessageHeadSocket(message.data));

            dispatch(addOrUpdateChat(res.data));
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

export default RemoveMember;
