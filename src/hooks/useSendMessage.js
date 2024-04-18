import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addMessage, sendMessage } from '~/features/messages/messagesSlice';
import { isImageFileByType, splitMessage } from '~/utils';
import validFileSize from '~/utils/validFileSize';

const useSendMessage = () => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getFilesByType = useCallback(
        (files) => {
            const imageFiles = [];
            const otherFiles = [];
            let hasBigFile = false;

            (files || []).forEach((file) => {
                if (!validFileSize(file.size)) return (hasBigFile = true);
                if (isImageFileByType(file.type)) return imageFiles.push(file);
                otherFiles.push(file);
            });

            if (hasBigFile) toast.error(t('chat.error-file-size'));

            return { imageFiles, otherFiles };
        },
        [t],
    );

    const showMessageToast = useCallback(
        ({ data }) => {
            if (data.invalidMessage) toast.error(t('chat.error-policy-message'));
            if (data?.invalidFiles?.length)
                toast.error(`File ${data.invalidFiles.join(', ')} ${t('chat.error-policy-files')}`);
            if (data?.failedUploads?.length)
                toast.error(
                    `${t('chat.error-send-files')} ${data.failedUploads.join(', ')}. ${t('chat.error-send-files-1')}`,
                );
        },
        [t],
    );

    const showError = useCallback(
        (error) => {
            console.error(error);

            toast.error(t('request-error'));
        },
        [t],
    );

    const handleSendImages = useCallback(
        ({ imageFiles, conversationId }) => {
            const formData = new FormData();
            const timeSend = Date.now();

            imageFiles.forEach((file) => formData.append('files', file));
            formData.append('conversationId', conversationId);
            formData.append('sender', user);
            formData.append('timeSend', timeSend);

            dispatch(sendMessage(formData)).unwrap().then(showMessageToast).catch(showError);
            dispatch(
                addMessage({
                    sender: user,
                    files: imageFiles,
                    conversationId,
                    timeSend,
                }),
            );
        },
        [dispatch, showError, showMessageToast, user],
    );

    const handleSendOtherFiles = useCallback(
        ({ files, conversationId }) => {
            files.forEach((file) => {
                const formData = new FormData();
                const timeSend = Date.now();

                formData.append('files', file);
                formData.append('conversationId', conversationId);
                formData.append('sender', user);
                formData.append('timeSend', timeSend);

                dispatch(sendMessage(formData)).unwrap().then(showMessageToast).catch(showError);
                dispatch(
                    addMessage({
                        sender: user,
                        files: [file],
                        conversationId,
                        timeSend,
                    }),
                );
            });
        },
        [dispatch, showError, showMessageToast, user],
    );

    const handleSendTextMessage = useCallback(
        ({ text, conversationId, reply, messages }) => {
            const timeSend = Date.now();
            dispatch(
                sendMessage({ messages: messages || splitMessage(text), conversationId, reply: reply?._id, timeSend }),
            )
                .unwrap()
                .then(showMessageToast)
                .catch(showError);
            dispatch(
                addMessage({
                    messages,
                    sender: user,
                    conversationId,
                    reply,
                    timeSend,
                }),
            );
        },
        [dispatch, showError, showMessageToast, user],
    );

    const handleSendTextImageMessage = useCallback(
        ({ image, conversationId, reply, messages, imageFiles, text }) => {
            const formData = new FormData();
            const timeSend = Date.now();

            formData.append('files', image);
            formData.append('conversationId', conversationId);
            formData.append('sender', user);
            reply?._id && formData.append('reply', reply?._id);
            formData.append('timeSend', timeSend);
            formData.append('messages', JSON.stringify(messages || splitMessage(text)));

            dispatch(sendMessage(formData)).unwrap().then(showMessageToast).catch(showError);
            dispatch(
                addMessage({
                    sender: user,
                    reply,
                    files: imageFiles,
                    conversationId,
                    timeSend,
                    messages,
                }),
            );
        },
        [dispatch, showError, showMessageToast, user],
    );

    return {
        getFilesByType,
        handleSendImages,
        handleSendOtherFiles,
        handleSendTextMessage,
        handleSendTextImageMessage,
    };
};

export default useSendMessage;
