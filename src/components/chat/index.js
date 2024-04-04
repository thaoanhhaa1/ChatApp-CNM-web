import { useWindowSize } from '@uidotdev/usehooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { ChatProvider } from '~/context';
import { addFiles } from '~/features/chat/chatSlice';
import { addMessage, sendMessage } from '~/features/messages/messagesSlice';
import { useBoolean } from '~/hooks';
import { classNames } from '~/utils';
import DropZone from '../dropZone';
import Toast from '../toast';
import Body from './body';
import ChatEmpty from './chatEmpty';
import Footer from './footer';
import Header from './header';
import HeaderSkeleton from './header/HeaderSkeleton';
import Profile from './profile';

const Chat = () => {
    const { t } = useTranslation();
    const { value: showProfile, setTrue: handleShowProfile, setFalse: handleHideProfile } = useBoolean(false);
    const { value: showDropZone, setFalse: setHiddenDropZone, setTrue: setShowDropZone } = useBoolean(false);
    const dropZoneRef = useRef();
    const [dropZoneHeights, setDropZoneHeights] = useState([0, 0]);
    const [showToast, setShowToast] = useState(false);
    const { files } = useSelector((state) => state.chat);
    const { active, activeLoading } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { width } = useWindowSize();
    const dispatch = useDispatch();

    const handleDropPreview = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file) => (file.id = v4()));
            dispatch(addFiles(acceptedFiles));
            setHiddenDropZone();
        },
        [dispatch, setHiddenDropZone],
    );

    const handleDropQuickSend = useCallback(
        (acceptedFiles) => {
            if (!active?._id) return;

            if (acceptedFiles.length > 50) setShowToast(true);
            else {
                const timeSend = Date.now();
                const message = { files: acceptedFiles, conversationId: active._id, timeSend };

                dispatch(sendMessage(message));
                dispatch(
                    addMessage({
                        ...message,
                        sender: user,
                    }),
                );
            }

            setHiddenDropZone();
        },
        [active?._id, dispatch, setHiddenDropZone, user],
    );

    useEffect(() => {
        const element = dropZoneRef.current;

        if (!element) return;

        let enterTarget = null;

        const handleDragEnter = (e) => {
            if (!active) return;

            const { top, bottom, left, right } = element.getBoundingClientRect();

            if (e.x >= left && e.x <= right && e.y >= top && e.y <= bottom) {
                setShowDropZone();
                enterTarget = e.target;
            }
        };

        const handleDragLeave = (e) => {
            const { top, bottom, left, right } = element.getBoundingClientRect();
            if (enterTarget === e.target && !(e.x >= left && e.x <= right && e.y >= top && e.y <= bottom))
                setHiddenDropZone();
        };

        window.addEventListener('dragenter', handleDragEnter);
        window.addEventListener('dragleave', handleDragLeave);

        return () => {
            window.removeEventListener('dragenter', handleDragEnter);
            window.removeEventListener('dragleave', handleDragLeave);
        };
    }, [active, setHiddenDropZone, setShowDropZone]);

    useEffect(() => {
        const element = dropZoneRef.current;

        if (!element) return;

        const parentHeight = element.clientHeight;
        const firstHeight = element.firstChild.clientHeight;

        setDropZoneHeights([firstHeight, parentHeight - firstHeight]);
    }, [files, width, active]);

    useEffect(() => {
        let id;

        if (showToast) id = setTimeout(() => setShowToast(false), 1000);

        return () => {
            clearTimeout(id);
        };
    }, [showToast]);

    return (
        <ChatProvider value={{ showProfile, handleHideProfile, handleShowProfile }}>
            <Toast
                message={t('chat.limit-files-send')}
                className={classNames('transition-opacity duration-150', showToast ? 'opacity-100' : 'opacity-0')}
            />
            <div className="flex h-full shadow-navbar z-1 dark:bg-dark">
                <div className="w-full flex flex-col flex-1">
                    {active || activeLoading ? (
                        <>
                            {activeLoading ? <HeaderSkeleton /> : <Header />}
                            <div ref={dropZoneRef} className="relative flex-1 flex flex-col">
                                <Body />
                                <Footer />

                                {showDropZone && (
                                    <div className="z-1 absolute inset-0">
                                        <DropZone
                                            onDrop={handleDropQuickSend}
                                            height={dropZoneHeights[0]}
                                            title={t('attachFiles.quickSend.title')}
                                            description={t('attachFiles.quickSend.description')}
                                        />
                                        <DropZone
                                            onDrop={handleDropPreview}
                                            height={dropZoneHeights[1]}
                                            title={t('attachFiles.preview.title')}
                                            description={t('attachFiles.preview.description')}
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <ChatEmpty />
                    )}
                </div>
                {showProfile && <Profile />}
            </div>
        </ChatProvider>
    );
};

Chat.propTypes = {};

export default Chat;
