import { useWindowSize } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CallWaiting from '~/components/call/CallWaiting';
import VideoCalling from '~/components/call/VideoCalling';
import Chat from '~/components/chat';
import Loading from '~/components/loading';
import Navbar from '~/components/navbar';
import SocketListener from '~/components/socketListener';
import Toast from '~/components/toast';
import config from '~/config';
import { screens } from '~/constants';
import { LayoutProvider } from '~/context';
import { setHideCalling, setShowCalling } from '~/features/calling/callingSlice';
import { getChats } from '~/features/chats/chatsSlice';

import { getFriends } from '~/features/friend/friendSlice';
import { updateRecentSearch } from '~/features/localSetting/localSettingSlice';
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
    const { locationError, toast } = useSelector((state) => state.toastAll);
    const { friendList } = useSelector((state) => state.friend);
    const { chats } = useSelector((state) => state.chats);
    const { contacts } = useSelector((state) => state.search);
    const { socket } = useSelector((state) => state.socket);
    const calling = useSelector((state) => state.calling);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const refSection = useRef(null);
    const [showCallWaiting, setShowCallWaiting] = useState(false);

    const handleClickOutsideCall = () => dispatch(setHideCalling());

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

    useEffect(() => {
        if (!user?._id || !socket) return;

        dispatch(getFriends()).unwrap().then().catch(console.error);
        dispatch(getChats()).unwrap().then().catch(console.error);
    }, [dispatch, socket, user?._id]);

    useEffect(() => {
        if (!user?._id || !Array.isArray(friendList) || !socket) return;

        socket.emit('online', { userId: user._id, friendIds: friendList.map((friend) => friend._id) });
    }, [friendList, socket, user?._id]);

    useEffect(() => {
        chats.forEach((chat) => {
            chat.users.forEach((user) => {
                dispatch(updateRecentSearch(user));
            });
        });
    }, [chats, dispatch]);

    useEffect(() => {
        contacts.forEach((contact) => {
            dispatch(updateRecentSearch(contact));
        });
    }, [contacts, dispatch]);

    useEffect(() => {
        friendList.forEach((friend) => {
            dispatch(updateRecentSearch(friend));
        });
    }, [dispatch, friendList]);

    useEffect(() => {
        if (!user._id) return;

        calling._id && user._id !== calling.sender?._id && setShowCallWaiting(true);
    }, [calling._id, calling.sender?._id, user._id]);

    useEffect(() => {
        if (!user._id) return;

        if (calling.acceptUserIds.includes(user._id)) dispatch(setShowCalling());
    }, [calling, calling.acceptUserIds, calling.type, dispatch, user._id]);

    if (loading || !user?._id) return <Loading />;

    return (
        <SocketListener>
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

                    {showCallWaiting && <CallWaiting onClose={() => setShowCallWaiting(false)} />}
                    {calling.showCalling && <VideoCalling onClickOutside={handleClickOutsideCall} />}
                </main>
            </LayoutProvider>
        </SocketListener>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
