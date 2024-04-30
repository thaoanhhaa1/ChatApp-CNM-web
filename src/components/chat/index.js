import { useWindowSize } from '@uidotdev/usehooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { groupRole, sentMessageStatus } from '~/constants';
import { ChatProvider } from '~/context';
import { addAttachedFile } from '~/features/attachedFiles/attachedFilesSlice';
import { addFiles } from '~/features/chat/chatSlice';
import { updateMessage } from '~/features/chats/chatsSlice';
import { updateState } from '~/features/messages/messagesSlice';
import { useBoolean, useToast } from '~/hooks';
import useSendMessage from '~/hooks/useSendMessage';
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
    const { getFilesByType, handleSendImages, handleSendOtherFiles } = useSendMessage();
    const dispatch = useDispatch();
    const myRole = useMemo(() => {
        if (!active?._id) return null;

        if (active.admin === user._id) return groupRole.OWNER_ROLE;

        if (active.deputy.includes(user._id)) return groupRole.ADMIN_ROLE;

        return groupRole.MEMBER_ROLE;
    }, [active?._id, active?.admin, active?.deputy, user._id]);

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
                const { imageFiles, otherFiles } = getFilesByType(acceptedFiles);

                if (imageFiles.length) handleSendImages({ imageFiles, conversationId: active._id });

                if (otherFiles.length) handleSendOtherFiles({ files: otherFiles, conversationId: active._id });
            }

            setHiddenDropZone();
        },
        [active?._id, getFilesByType, handleSendImages, handleSendOtherFiles, setHiddenDropZone, setShowToast],
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

        if (lastMessage.state === sentMessageStatus.SENT) {
            console.log(`lastMessage`, lastMessage);
            socket.emit('sendMessage', lastMessage);
            dispatch(
                updateMessage({
                    conversationId: lastMessage.conversation?._id || lastMessage?.conversationId,
                    message: {
                        ...lastMessage,
                        state: null,
                    },
                }),
            );
            dispatch(updateState({ _id: lastMessage._id }));

            const files = lastMessage.files || [];

            files.forEach((file) => dispatch(addAttachedFile(file)));
        }
    }, [dispatch, messages, socket]);

    useEffect(() => {
        active?._id && handleHideProfile();
    }, [active?._id, handleHideProfile]);

    return (
        <ChatProvider value={{ showProfile, handleHideProfile, handleShowProfile, myRole }}>
            <Toast showToast={showToast} message={t('chat.limit-files-send')} />
            <div className="flex h-full shadow-navbar z-1 dark:bg-dark">
                <div className="w-full flex flex-col flex-1">
                    {active || activeLoading ? (
                        <>
                            {activeLoading ? <HeaderSkeleton /> : <Header />}
                            <div ref={dropZoneRef} className="relative flex-1 flex flex-col">
                                <div className="relative flex-1 flex flex-col">
                                    {active?.pinnedMessages ? <PinMessages messages={active.pinnedMessages} /> : null}
                                    <Body />
                                </div>
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
