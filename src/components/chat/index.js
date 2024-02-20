import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { ChatProvider } from '~/context';
import { addFiles } from '~/features/attachFiles/attachFilesSlice';
import { useBoolean } from '~/hooks';
import DropZone from '../dropZone';
import Body from './body';
import Footer from './footer';
import Header from './header';
import Profile from './profile';

const Chat = () => {
    const { t } = useTranslation();
    const { value: showProfile, setTrue: handleShowProfile, setFalse: handleHideProfile } = useBoolean(false);
    const { value: showDropZone, setFalse: setHiddenDropZone, setTrue: setShowDropZone } = useBoolean(false);
    const dropZoneRef = useRef();
    const [dropZoneHeights, setDropZoneHeights] = useState([0, 0]);
    const { files } = useSelector((state) => state.attachFiles);
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
            console.log('Handle send files...', acceptedFiles);
            setHiddenDropZone();
        },
        [setHiddenDropZone],
    );

    useEffect(() => {
        const element = dropZoneRef.current;

        if (!element) return;

        let enterTarget = null;
        const { x, y, width, height } = element.getBoundingClientRect();

        const handleDragEnter = (e) => {
            if (e.x >= x && e.x <= x + width && e.y >= y && e.y <= y + height) {
                setShowDropZone();
                enterTarget = e.target;
            }
        };

        const handleDragLeave = (e) => {
            if (enterTarget === e.target && !(e.x >= x && e.x <= x + width && e.y >= y && e.y <= y + height))
                setHiddenDropZone();
        };

        window.addEventListener('dragenter', handleDragEnter);
        window.addEventListener('dragleave', handleDragLeave);

        return () => {
            window.removeEventListener('dragenter', handleDragEnter);
            window.removeEventListener('dragleave', handleDragLeave);
        };
    }, [setHiddenDropZone, setShowDropZone]);

    useEffect(() => {
        const element = dropZoneRef.current;

        if (!element) return;

        const parentHeight = element.clientHeight;
        const firstHeight = element.firstChild.clientHeight;

        setDropZoneHeights([firstHeight, parentHeight - firstHeight]);
    }, [files]);

    return (
        <ChatProvider value={{ showProfile, handleHideProfile, handleShowProfile }}>
            <div className="flex h-full shadow-navbar z-1 dark:bg-dark">
                <div className="w-full flex flex-col flex-1">
                    <Header />
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
                </div>
                {showProfile && <Profile />}
            </div>
        </ChatProvider>
    );
};

Chat.propTypes = {};

export default Chat;
