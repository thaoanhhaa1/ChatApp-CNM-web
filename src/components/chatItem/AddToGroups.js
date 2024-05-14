import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { messageNotificationType } from '~/constants';
import { addOrUpdateChat } from '~/features/chats/chatsSlice';
import { useSendMessage } from '~/hooks';
import conversationServices from '~/services/conversation.service';
import messageServices from '~/services/message.service';
import { isUserInConversation } from '~/utils';
import Modal from '../modal';
import SelectedConversation from '../selectedConversation';

const AddToGroups = ({ conversationId, userId, show, onClickOutside }) => {
    const { t } = useTranslation();
    const [selectedContacts, setSelectedContacts] = useState([]);
    const { chats } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const groups = useMemo(
        () => chats.filter((chat) => chat.isGroup && !isUserInConversation(chat, userId)),
        [chats, userId],
    );
    const [loading, setLoading] = useState(false);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const { handleSendNotificationMessage } = useSendMessage();

    const handleAdd = async () => {
        setLoading(true);

        try {
            const conversationIds = selectedContacts.map((i) => i._id);

            const [res, ...messages] = await Promise.all([
                conversationServices.addToGroups(conversationIds, userId),
                ...selectedContacts.map((item) =>
                    messageServices.addMessageNotification({
                        conversationId: item._id,
                        userIds: [userId],
                        type: messageNotificationType.ADD_USERS,
                    }),
                ),
                messageServices.addMessageNotification({
                    conversationId,
                    type: messageNotificationType.INVITE_TO_GROUP,
                    conversations: conversationIds,
                    userIds: [userId],
                }),
            ]);

            const conversations = res.data;

            conversations.forEach((conversation) => {
                const userIds = conversation.users.map((i) => i._id);

                socket.emit('addOrUpdateConversation', { conversation, userIds });
                dispatch(
                    addOrUpdateChat({
                        ...conversation,
                        myId: user._id,
                    }),
                );
            });

            messages.forEach(handleSendNotificationMessage);
            onClickOutside();
        } catch (error) {
            toast.error(t('request-error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <Modal.Header onClose={onClickOutside}>{t('group.invite-to-group.title')}</Modal.Header>

            <SelectedConversation
                showSelected={show}
                showSearch
                setSelectedContacts={setSelectedContacts}
                selectedContacts={selectedContacts}
                className="h-[75vh]"
                groups={groups}
                searchPlaceholder={t('group.invite-to-group.search-placeholder')}
            />

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={onClickOutside} type="text-primary">
                    {t('group.invite-to-group.cancel')}
                </Modal.Button>
                <Modal.Button onClick={handleAdd} loading={loading} disabled={!selectedContacts.length || loading}>
                    {t('group.invite-to-group.invite')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

AddToGroups.propTypes = {
    conversationId: PropTypes.string.isRequired,
    userId: PropTypes.string,
    show: PropTypes.bool,
    onClickOutside: PropTypes.func,
};

export default AddToGroups;
