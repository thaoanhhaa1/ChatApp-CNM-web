import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sound from '~/assets/sounds/message-sound.mp3';
import { DeleteMessageStatus, FriendStatus } from '~/constants';
import { setContact } from '~/features/addContact/addContactSlice';
import { addAttachedFile, removeAttachedFile } from '~/features/attachedFiles/attachedFilesSlice';
import { acceptCall, cancelCall, setCalling } from '~/features/calling/callingSlice';
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
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const { contact } = useSelector((state) => state.addContact);
    const { offlineRecent } = useSelector((state) => state.onlineUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user?._id) return;

        if (!socket) {
            dispatch(connect());
            return;
        }

        // Nhận khi user khác online
        socket.on('userOnline', (userId) => {
            console.log('🚀 ~ socket.on ~ userOnline ~ userId:', userId);

            const idTimeout = offlineRecent[userId];

            if (idTimeout) clearTimeout(idTimeout);
            else dispatch(addOnlineUser(userId));
        });

        // Nhận khi chính mình online
        socket.on('usersOnline', (userIds) => {
            console.log('🚀 ~ socket.on ~ usersOnline ~ userIds:', userIds);

            dispatch(addOnlineUsers(userIds));
        });

        // Nhận khi user khác offline
        socket.on('userOffline', (userId) => {
            console.log('🚀 ~ socket.on ~ userOffline ~ userId:', userId);

            const idTimeout = setTimeout(() => dispatch(removeOnlineUser(userId)), [10000]);
            dispatch(addOfflineRecent({ userId, idTimeout }));
        });

        socket.on('receivedMessage', (message) => {
            console.log('🚀 ~ socket.on ~ receivedMessage ~ message:', message);

            dispatch(
                addMessageHead({
                    myId: user._id,
                    ...message,
                }),
            );

            const files = message.files || [];
            console.log('🚀 ~ socket.on ~ files:', files);
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
            console.log('🚀 ~ socket.on ~ openConversation ~ data:', data);

            dispatch(addChat(data));

            if (data?.isGroup) dispatch(addGroup(data));
        });

        socket.on('typing', (data) => {
            console.log('🚀 ~ socket.on ~ typing ~ data:', data);

            dispatch(
                setTyping({
                    ...data,
                    typing: true,
                }),
            );
        });

        socket.on('stopTyping', (data) => {
            console.log('🚀 ~ socket.on ~ stopTyping ~ data:', data);

            dispatch(
                setTyping({
                    ...data,
                    typing: false,
                }),
            );
        });

        socket.on('recallMessage', (message) => {
            console.log('🚀 ~ socket.on ~ recallMessage ~ message:', message);

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
            console.log('🚀 ~ socket.on ~ pinMessage ~ message:', message);

            dispatch(addPinMessage({ conversationId: message.conversation._id, message }));
        });
        socket.on('unpinMessage', ({ message }) => {
            console.log('🚀 ~ socket.on ~ unpinMessage ~ message:', message);

            dispatch(removePinMessage({ conversationId: message.conversation._id, message }));
        });

        socket.on('reactForMessage', ({ conversationId, messageId, userId, react }) => {
            console.group('🚀 ~ socket.on ~ reactForMessage');
            console.log('react:', react);
            console.log('userId:', userId);
            console.log('messageId:', messageId);
            console.log('conversationId:', conversationId);
            console.groupEnd();

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
            console.log('🚀 ~ socket.on ~ sendFriendRequest ~ friendRequest:', friendRequest);

            dispatch(addResponseFriend(friendRequest));
            dispatch(setNewReceived(true));

            if (contact?._id === friendRequest.sender_id._id)
                dispatch(setContact({ ...contact, status: FriendStatus.RECEIVED }));
        });

        socket.on('acceptFriend', (data) => {
            console.log('🚀 ~ socket.on ~ acceptFriend ~ data:', data);

            dispatch(acceptFriendSent(data));

            if (contact?._id === data.user._id) dispatch(setContact({ ...contact, status: FriendStatus.FRIEND }));
        });

        socket.on('rejectFriend', ({ _id }) => {
            console.log('🚀 ~ socket.on ~ rejectFriend ~ _id:', _id);

            dispatch(rejectFriendSent(_id));
        });

        socket.on('revocationRequestFriend', ({ _id, receivedId }) => {
            console.log('🚀 ~ socket.on ~ revocationRequestFriend ~ _id:', _id);

            dispatch(rejectFriendReceived(_id));

            if (contact?._id === receivedId) dispatch(setContact({ ...contact, status: FriendStatus.NOT_FRIEND }));
        });

        socket.on('deleteFriend', ({ senderId }) => {
            console.log('🚀 ~ socket.on ~ deleteFriend ~ senderId:', senderId);

            dispatch(removeFriend({ _id: senderId }));
        });

        socket.on('deleteConversation', ({ _id }) => {
            console.log('🚀 ~ socket.on ~ deleteConversation ~ _id:', _id);

            dispatch(removeConversation(_id));
            dispatch(removeGroup(_id));
        });

        socket.on('addOrUpdateConversation', ({ conversation }) => {
            console.log('🚀 ~ socket.on ~ addOrUpdateConversation ~ conversation:', conversation);

            dispatch(addOrUpdateChat(conversation));
            dispatch(addOrUpdateGroup(conversation));
        });

        socket.on('removeUserFromConversation', ({ conversationId }) => {
            console.log('🚀 ~ socket.on ~ removeUserFromConversation ~ conversationId:', conversationId);

            dispatch(removeConversation(conversationId));
            dispatch(removeGroup(conversationId));
        });

        socket.on('addToGroups', ({ conversations }) => {
            console.log('🚀 ~ socket.on ~ addToGroups ~ conversations:', conversations);

            conversations.forEach((conversation) => {
                dispatch(addOrUpdateChat(conversation));
            });
        });

        socket.on('call', ({ type, sender, users, _id }) => {
            console.log('🚀 ~ socket.on ~ call ~ users', users);

            console.log('🚀 ~ socket.on ~ call ~ type', type);
            console.log('🚀 ~ socket.on ~ call ~ sender', sender);
            console.log('🚀 ~ socket.on ~ call ~ _id', _id);

            dispatch(setCalling({ _id, users, type, sender }));
        });

        socket.on('cancelCall', ({ _id }) => {
            console.log('🚀 ~ socket.on ~ cancelCall ~ _id:', _id);

            dispatch(cancelCall(_id));
        });

        socket.on('acceptCall', ({ _id, receiver }) => {
            console.log('🚀 ~ socket.on ~ acceptCall ~ _id:', _id);
            console.log('🚀 ~ socket.on ~ acceptCall ~ receiver:', receiver);

            dispatch(acceptCall({ _id, receiver }));
        });

        socket.on('rejectCall', ({ receiver, _id }) => {});
    }, [active?._id, contact, dispatch, offlineRecent, socket, user?._id]);

    return children;
};

SocketListener.propTypes = {
    children: PropTypes.node,
};

export default SocketListener;
