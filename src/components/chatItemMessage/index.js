import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FileTextFillIcon, ImageFillIcon, LocationIcon, StickerSmileIcon } from '~/assets';
import { DeleteMessageStatus } from '~/constants';
import { getLastMessageNoDeleted, isImageFileByType } from '~/utils';
import ChatMessage from '../chatMessage';

const ChatItemMessage = ({ chat }) => {
    const { t } = useTranslation();
    const lastMessage = getLastMessageNoDeleted(chat.messages) || chat.lastMessage;
    const isHasFiles = lastMessage?.files?.length;
    const isImageList = isHasFiles && isImageFileByType(lastMessage.files[0].type);
    const message = chat.lastMessage;
    const recalled = message?.deleted === DeleteMessageStatus.RECALL;

    const subTitle = useMemo(() => {
        if (lastMessage?.sticker) return t('chats.sticker');

        if (isImageList) return t('chats.photo');

        if (isHasFiles) return lastMessage?.files[0].name;

        if (lastMessage.location) return lastMessage.location.vicinity;

        return '';
    }, [lastMessage?.sticker, lastMessage?.files, lastMessage.location, t, isImageList, isHasFiles]);

    return (
        <div className="flex gap-1 items-center">
            {!recalled && isImageList ? (
                <span className="text-secondary dark:text-dark-secondary">
                    <ImageFillIcon className="w-[14px] h-[14px]" />
                </span>
            ) : null}
            {!recalled && message?.sticker ? (
                <span className="text-secondary dark:text-dark-secondary">
                    <StickerSmileIcon className="w-[14px] h-[14px]" />
                </span>
            ) : null}
            {!recalled && isHasFiles && !isImageList ? (
                <span className="text-secondary dark:text-dark-secondary">
                    <FileTextFillIcon className="w-[14px] h-[14px]" />
                </span>
            ) : null}
            {!recalled && lastMessage.location ? (
                <span className="text-secondary dark:text-dark-secondary">
                    <LocationIcon className="w-[14px] h-[14px]" />
                </span>
            ) : null}
            {subTitle && !recalled && !message?.messages?.length ? (
                <span className="text-sm text-secondary dark:text-dark-secondary line-clamp-1">{subTitle}</span>
            ) : null}
            {message?.messages || recalled ? (
                <ChatMessage
                    status={message?.deleted}
                    isMe
                    className="line-clamp-1 break-all"
                    isReply
                    messages={message?.messages || []}
                />
            ) : null}
        </div>
    );
};

ChatItemMessage.propTypes = {
    chat: PropTypes.object.isRequired,
};

export default ChatItemMessage;
