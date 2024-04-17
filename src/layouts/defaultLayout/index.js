import { useWindowSize } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chat from '~/components/chat';
import Loading from '~/components/loading';
import Navbar from '~/components/navbar';
import Toast from '~/components/toast';
import config from '~/config';
import { DeleteMessageStatus, screens } from '~/constants';
import { LayoutProvider } from '~/context';
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
import { setLocationError, setToast } from '~/features/toastAll/toastAllSlice';
import { getUserInfo } from '~/features/user/userSlice';
import { useToast } from '~/hooks';
import { classNames } from '~/utils';

// TODO Check user
/**
 * - User not exist
 *          ++ accessToken invalid
 *              +++ refreshToken valid ==> Get accessToken
 *              +++ refreshToken invalid ==> redirect to Home
 */

let redirect = false;

const DefaultLayout = ({ children }) => {
    const { t } = useTranslation();
    const [showChat, setShowChat] = useState(false);
    const [showToast, setShowToast] = useToast(1500);
    const { width } = useWindowSize();
    const { user, loading } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const { active } = useSelector((state) => state.chats);
    const { locationError, toast } = useSelector((state) => state.toastAll);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const refSection = useRef(null);

    useEffect(() => {
        width > screens.DL && setShowChat(false);
    }, [width]);

    useEffect(() => {
        if (user?._id || loading || redirect) return;

        const getData = async () => {
            try {
                await dispatch(getUserInfo()).unwrap();
            } catch (error) {
                console.error(error);
                if (!redirect) {
                    navigation(config.routes.signIn);
                    redirect = true;
                }
            }
        };

        getData();
    }, [dispatch, loading, navigation, user?._id]);

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

            dispatch(addMessageHead(message));

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

    useEffect(() => {
        if (!locationError) return;

        setTimeout(() => {
            dispatch(setLocationError(false));
        }, 1500);
    }, [dispatch, locationError]);

    useEffect(() => {
        toast && setShowToast(true);
    }, [setShowToast, toast]);

    useEffect(() => {
        showToast || setTimeout(() => dispatch(setToast('')), 500);
    }, [dispatch, showToast]);

    if (loading || !user?._id) return <Loading />;

    return (
        <LayoutProvider value={{ setShowChat }}>
            <main className="flex flex-col dl:flex-row h-screen">
                <Toast showToast={locationError} message={t('location.error-api')} />
                <Toast showToast={!!toast} message={toast} />
                <Navbar />
                <section
                    ref={refSection}
                    className={classNames(
                        'relative flex flex-1 dl:order-2 overflow-hidden transition-[z-index]',
                        showChat && width < screens.DL ? 'z-20' : 'z-1',
                    )}
                >
                    <div className="flex-shrink-0 relative w-full dl:w-sidebar bg-sidebar-sub-bg dark:bg-dark-sidebar-sub-bg transition-width ease-linear duration-400">
                        <div className="absolute inset-0 overflow-y-hidden">{children}</div>
                    </div>
                    <div
                        className={classNames(
                            'z-1 fixed dl:relative inset-0 flex-1 transition-transform ease-linear duration-400 bg-white',
                            showChat ? 'translate-x-0 z-10' : 'translate-x-full dl:translate-x-0',
                        )}
                    >
                        <Chat />
                    </div>
                </section>
            </main>
        </LayoutProvider>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
