import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteMessageStatus } from '~/constants';
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
import { connect } from '~/features/socket/socketSlice';

const SocketListener = ({ children }) => {
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user?._id) return;

        if (!socket) {
            dispatch(connect());
            return;
        }

        socket.emit('online', user._id);

        socket.on('usersOnline', (data) => {
            // TODO
            // console.log(data);
        });

        socket.on('receivedMessage', (message) => {
            console.log('🚀 ~ socket.on ~ receivedMessage ~ message:', message);

            dispatch(
                addMessageHead({
                    myId: user._id,
                    ...message,
                }),
            );

            if (active?._id === message.conversation._id) dispatch(addMessageSocket(message));
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
        });

        socket.on('acceptFriend', (data) => {
            console.log('🚀 ~ socket.on ~ acceptFriend ~ data:', data);

            dispatch(acceptFriendSent(data));
        });

        socket.on('rejectFriend', ({ _id }) => {
            console.log('🚀 ~ socket.on ~ rejectFriend ~ _id:', _id);

            dispatch(rejectFriendSent(_id));
        });

        socket.on('revocationRequestFriend', ({ _id }) => {
            console.log('🚀 ~ socket.on ~ revocationRequestFriend ~ _id:', _id);

            dispatch(rejectFriendReceived(_id));
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
    }, [active?._id, dispatch, socket, user?._id]);

    return children;
};

SocketListener.propTypes = {
    children: PropTypes.node,
};

export default SocketListener;
