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
    addPinMessage,
    removePinMessage,
    setTyping,
    updateMessage,
    updateMessageReact,
} from '~/features/chats/chatsSlice';
import { addMessageSocket, updateDeletedMessage, updateReact } from '~/features/messages/messagesSlice';
import { connect } from '~/features/socket/socketSlice';
import { setLocationError } from '~/features/toastAll/toastAllSlice';
import { getUserInfo } from '~/features/user/userSlice';
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
    const { width } = useWindowSize();
    const { user, loading } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const { active } = useSelector((state) => state.chats);
    const { locationError } = useSelector((state) => state.toastAll);
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
            dispatch(addMessageHead(message));

            if (active?._id === message.conversation._id) dispatch(addMessageSocket(message));
        });

        socket.on('openConversation', (data) => dispatch(addChat(data)));

        socket.on('typing', (data) =>
            dispatch(
                setTyping({
                    ...data,
                    typing: true,
                }),
            ),
        );

        socket.on('stopTyping', (data) =>
            dispatch(
                setTyping({
                    ...data,
                    typing: false,
                }),
            ),
        );

        socket.on('recallMessage', (message) => {
            dispatch(updateDeletedMessage({ _id: message._id, deleted: DeleteMessageStatus.RECALL }));
            dispatch(
                updateMessage({
                    conversationId: message.conversation._id,
                    message: { ...message, deleted: DeleteMessageStatus.RECALL },
                }),
            );
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
    }, [active?._id, dispatch, socket, user._id]);

    useEffect(() => {
        if (!refSection.current) return;

        if (showChat && width < screens.DL) refSection.current.style.zIndex = 20;
        else refSection.current.style.zIndex = 1;
    }, [showChat, width]);

    useEffect(() => {
        if (!locationError) return;

        setTimeout(() => {
            dispatch(setLocationError(false));
        }, 1500);
    }, [dispatch, locationError]);

    if (loading || !user?._id) return <Loading />;

    return (
        <LayoutProvider value={{ setShowChat }}>
            <main className="flex flex-col dl:flex-row h-screen">
                <Toast showToast={locationError} message={t('location.error-api')} />
                <Navbar />
                <section
                    ref={refSection}
                    className={classNames(
                        'relative flex flex-1 dl:order-2 overflow-hidden transition-[z-index] delay-400 dl:delay-0',
                        // showChat ? 'z-20' : 'z-1 delay-400 dl:delay-0',
                    )}
                >
                    <div className="flex-shrink-0 relative w-full dl:w-sidebar bg-sidebar-sub-bg dark:bg-dark-sidebar-sub-bg transition-width ease-linear duration-400">
                        <div className="absolute inset-0 overflow-y-hidden">{children}</div>
                    </div>
                    <div
                        className={classNames(
                            'z-1 fixed dl:relative inset-0 flex-1 transition-transform ease-linear duration-400 bg-white',
                            showChat ? 'translate-x-0' : 'translate-x-full dl:translate-x-0',
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
