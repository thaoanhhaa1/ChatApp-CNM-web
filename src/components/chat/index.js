import { useWindowSize } from '@uidotdev/usehooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { sentMessageStatus } from '~/constants';
import { ChatProvider } from '~/context';
import { addFiles } from '~/features/chat/chatSlice';
import { updateLastMessage } from '~/features/chats/chatsSlice';
import { addMessage, sendMessage } from '~/features/messages/messagesSlice';
import { useBoolean, useToast } from '~/hooks';
import { classNames, isImageFileByType } from '~/utils';
import DropZone from '../dropZone';
import PinMessages from '../pinMessages';
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
    const [showToast, setShowToast] = useToast(1000);
    const { files } = useSelector((state) => state.chat);
    const { active, activeLoading } = useSelector((state) => state.chats);
    const { messages } = useSelector((state) => state.messages);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
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
                const imageFiles = [];
                const otherFiles = [];

                (acceptedFiles || []).forEach((file) => {
                    if (isImageFileByType(file.type)) return imageFiles.push(file);

                    otherFiles.push(file);
                });

                if (imageFiles.length) {
                    const formData = new FormData();

                    imageFiles.forEach((file) => formData.append('files', file));
                    formData.append('conversationId', active._id);
                    formData.append('sender', user);
                    formData.append('timeSend', timeSend);

                    dispatch(sendMessage(formData));
                    dispatch(
                        addMessage({
                            sender: user,
                            files: imageFiles,
                            conversationId: active._id,
                            timeSend,
                        }),
                    );
                }

                if (otherFiles.length) {
                    otherFiles.forEach((file) => {
                        const formData = new FormData();

                        formData.append('files', file);
                        formData.append('conversationId', active._id);
                        formData.append('sender', user);
                        formData.append('timeSend', timeSend);

                        dispatch(sendMessage(formData));
                        dispatch(
                            addMessage({
                                sender: user,
                                files: [file],
                                conversationId: active._id,
                                timeSend,
                            }),
                        );
                    });
                }
            }

            setHiddenDropZone();
        },
        [active?._id, dispatch, setHiddenDropZone, setShowToast, user],
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
        const lastMessage = messages?.[0];

        if (!lastMessage) return;

        if (lastMessage.state === sentMessageStatus.SENT) socket.emit('sendMessage', lastMessage);

        dispatch(
            updateLastMessage({
                conversationId: lastMessage.conversation?._id || lastMessage?.conversationId,
                message: lastMessage,
            }),
        );
    }, [dispatch, messages, socket]);

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
                                {/* <div className="relative flex-1 flex flex-col"> */}
                                <PinMessages messages={active?.pinnedMessages} />
                                <Body />
                                {/* </div> */}
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
