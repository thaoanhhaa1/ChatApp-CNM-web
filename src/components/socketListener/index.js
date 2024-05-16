import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import sound from '~/assets/sounds/message-sound.mp3';
import { DeleteMessageStatus, FriendStatus } from '~/constants';
import { setContact } from '~/features/addContact/addContactSlice';
import { addAttachedFile, removeAttachedFile } from '~/features/attachedFiles/attachedFilesSlice';
import {
    acceptCall,
    addBusyUserId,
    addEndedUserIds,
    addMissedUserIds,
    addRejectUserIds,
    resetCalling,
    setCalling,
} from '~/features/calling/callingSlice';
import {
    addChat,
    addMessageHead,
    addOrUpdateChat,
    addPinMessage,
    removeConversation,
    removePinMessage,
    setTyping,
    updateMessage,
    updateMessageReact,
} from '~/features/chats/chatsSlice';
import { addGroup, addOrUpdateGroup, removeGroup } from '~/features/contactGroups/contactGroupsSlice';
import {
    acceptFriendSent,
    addResponseFriend,
    rejectFriendReceived,
    rejectFriendSent,
    removeFriend,
    setNewReceived,
} from '~/features/friend/friendSlice';
import { addMessageSocket, updateDeletedMessage, updateReact } from '~/features/messages/messagesSlice';
import {
    addOfflineRecent,
    addOnlineUser,
    addOnlineUsers,
    removeOnlineUser,
} from '~/features/onlineUsers/onlineUsersSlice';
import { connect } from '~/features/socket/socketSlice';

const messageSound = new Audio(sound);

const SocketListener = ({ children }) => {
    const { t } = useTranslation();
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const { contact } = useSelector((state) => state.addContact);
    const { offlineRecent } = useSelector((state) => state.onlineUsers);
    const { acceptUserIds, rejectUserIds, endedUserIds, _id: prevId } = useSelector((state) => state.calling);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user?._id) return;

        if (!socket) {
            dispatch(connect());
            return;
        }

        // Nhận khi user khác online
        socket.on('userOnline', (userId) => {
            const idTimeout = offlineRecent[userId];

            if (idTimeout) clearTimeout(idTimeout);
            else dispatch(addOnlineUser(userId));
        });

        // Nhận khi chính mình online
        socket.on('usersOnline', (userIds) => {
            dispatch(addOnlineUsers(userIds));
        });

        // Nhận khi user khác offline
        socket.on('userOffline', (userId) => {
            const idTimeout = setTimeout(() => dispatch(removeOnlineUser(userId)), [10000]);
            dispatch(addOfflineRecent({ userId, idTimeout }));
        });

        socket.on('receivedMessage', (message) => {
            dispatch(
                addMessageHead({
                    myId: user._id,
                    ...message,
                }),
            );

            const files = message.files || [];
            files.forEach((file) =>
                dispatch(
                    addAttachedFile({
                        conversationId: message.conversation?._id || message?.conversationId,
                        file,
                    }),
                ),
            );

            if (active?._id === message.conversation._id) dispatch(addMessageSocket(message));

            messageSound.play().catch((error) => console.error('🚀 ~ error:', error));
        });

        socket.on('openConversation', (data) => {
            dispatch(
                addChat({
                    ...data,
                    myId: user._id,
                }),
            );

            if (data?.isGroup) dispatch(addGroup(data));
        });

        socket.on('typing', (data) => {
            dispatch(
                setTyping({
                    ...data,
                    typing: true,
                }),
            );
        });

        socket.on('stopTyping', (data) => {
            dispatch(
                setTyping({
                    ...data,
                    typing: false,
                }),
            );
        });

        socket.on('recallMessage', (message) => {
            dispatch(updateDeletedMessage({ _id: message._id, deleted: DeleteMessageStatus.RECALL }));
            dispatch(
                updateMessage({
                    conversationId: message.conversation._id,
                    message: { ...message, deleted: DeleteMessageStatus.RECALL },
                }),
            );

            const files = message.files || [];
            files.forEach((file) => dispatch(removeAttachedFile({ conversationId: message.conversation._id, file })));
        });

        socket.on('pinMessage', ({ message }) => {
            dispatch(addPinMessage({ conversationId: message.conversation._id, message }));
        });
        socket.on('unpinMessage', ({ message }) => {
            dispatch(removePinMessage({ conversationId: message.conversation._id, message }));
        });

        socket.on('reactForMessage', ({ conversationId, messageId, userId, react }) => {
            dispatch(
                updateMessageReact({
                    conversationId,
                    messageId,
                    userId,
                    react,
                }),
            );
            dispatch(updateReact({ _id: messageId, userId, react }));
        });

        socket.on('sendFriendRequest', (friendRequest) => {
            dispatch(addResponseFriend(friendRequest));
            dispatch(setNewReceived(true));

            if (contact?._id === friendRequest.sender_id._id)
                dispatch(setContact({ ...contact, status: FriendStatus.RECEIVED }));
        });

        socket.on('acceptFriend', (data) => {
            dispatch(acceptFriendSent(data));

            if (contact?._id === data.user._id) dispatch(setContact({ ...contact, status: FriendStatus.FRIEND }));
        });

        socket.on('rejectFriend', ({ _id }) => {
            dispatch(rejectFriendSent(_id));
        });

        socket.on('revocationRequestFriend', ({ _id, receivedId }) => {
            dispatch(rejectFriendReceived(_id));

            if (contact?._id === receivedId) dispatch(setContact({ ...contact, status: FriendStatus.NOT_FRIEND }));
        });

        socket.on('deleteFriend', ({ senderId }) => {
            dispatch(removeFriend({ _id: senderId }));
        });

        socket.on('deleteConversation', ({ _id }) => {
            dispatch(removeConversation(_id));
            dispatch(removeGroup(_id));
        });

        socket.on('addOrUpdateConversation', ({ conversation }) => {
            dispatch(
                addOrUpdateChat({
                    ...conversation,
                    myId: user._id,
                }),
            );
            dispatch(addOrUpdateGroup(conversation));
        });

        socket.on('removeUserFromConversation', ({ conversationId }) => {
            dispatch(removeConversation(conversationId));
            dispatch(removeGroup(conversationId));
        });

        socket.on('addToGroups', ({ conversations }) => {
            conversations.forEach((conversation) => {
                dispatch(
                    addOrUpdateChat({
                        ...conversation,
                        myId: user._id,
                    }),
                );
            });
        });

        socket.on('call', ({ type, sender, users, _id, conversationName, isGroup }) => {
            if (prevId.length && prevId !== _id) {
                socket.emit('busyCall', { _id, sender: user });
            } else if (!prevId) dispatch(setCalling({ _id, users, type, sender, conversationName, isGroup }));
        });

        socket.on('rejectCall', ({ _id, sender }) => {
            dispatch(addRejectUserIds({ _id, senderId: sender._id }));
        });

        socket.on('acceptCall', ({ _id, receiver }) => {
            dispatch(acceptCall({ _id, receiver }));
        });

        socket.on('endCall', ({ sender, _id }) => {
            dispatch(addEndedUserIds({ _id, senderId: sender._id }));
        });

        socket.on('busyCall', ({ _id, sender }) => {
            dispatch(addBusyUserId({ _id, senderId: sender._id }));
        });

        socket.on('missedCallToAccepter', ({ _id, missedUserIds }) => {
            dispatch(addMissedUserIds({ _id, missedUserIds }));
        });

        socket.on('missedCall', ({ _id, conversationName }) => {
            dispatch(resetCalling());
            toast.info(`${t('call.missed-notify')} ${conversationName}`);
        });

        return () => {
            if (!socket) return;

            socket.off('busyCall');
            socket.off('missedCall');
            socket.off('missedCallToAccepter');
            socket.off('endCall');
            socket.off('acceptCall');
            socket.off('rejectCall');
            socket.off('call');
            socket.off('addToGroups');
            socket.off('removeUserFromConversation');
            socket.off('addOrUpdateConversation');
            socket.off('deleteConversation');
            socket.off('deleteFriend');
            socket.off('revocationRequestFriend');
            socket.off('rejectFriend');
            socket.off('acceptFriend');
            socket.off('sendFriendRequest');
            socket.off('reactForMessage');
            socket.off('unpinMessage');
            socket.off('pinMessage');
            socket.off('recallMessage');
            socket.off('stopTyping');
            socket.off('typing');
            socket.off('openConversation');
            socket.off('receivedMessage');
            socket.off('userOffline');
            socket.off('usersOnline');
            socket.off('userOnline');
        };
    }, [
        acceptUserIds,
        active?._id,
        contact,
        dispatch,
        endedUserIds,
        endedUserIds.length,
        offlineRecent,
        prevId,
        rejectUserIds,
        rejectUserIds.length,
        socket,
        t,
        user,
        user._id,
    ]);

    return children;
};

SocketListener.propTypes = {
    children: PropTypes.node,
};

export default SocketListener;
