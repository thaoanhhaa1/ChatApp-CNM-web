import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CloseLineIcon, FileTextFillIcon } from '~/assets';
import { DeleteMessageStatus } from '~/constants';
import { classNames, isImageFileByType } from '~/utils';
import ChatMessage from '../chatMessage';
import StickerItem from '../sticker/StickerItem';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const ReplyMessage = ({ className, message, isMe, showClose, onClose = () => {}, onClick = () => {} }) => {
    const { t } = useTranslation();
    const isHasFiles = message.files?.length;
    const image = isHasFiles && isImageFileByType(message.files[0].type) && message.files[0].link;
    const otherFileName = !image && isHasFiles && message.files[0].name;
    const recalled = message.deleted === DeleteMessageStatus.RECALL;
    const subTitle = useMemo(() => {
        if (message.sticker) return '[Sticker]';

        if (otherFileName) return otherFileName;

        if (!message.messages?.length && image) return message.files[0].name;

        if (message.location) return `[${t('chat.location')}] ${message.location.name}`;

        return '';
    }, [image, message.files, message.location, message.messages?.length, message.sticker, otherFileName, t]);

    const handleClick = () => onClick(message);
    const handleClose = (e) => {
        e.stopPropagation();

        onClose();
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'relative flex gap-2 items-center px-3 py-2.5 rounded-md cursor-pointer',
                isMe ? 'bg-white dark:bg-dark-sidebar-item-active-bg' : 'bg-primary-color bg-opacity-50',
                className,
            )}
        >
            <div className="w-0.5 h-10 bg-primary-color" />
            {image && !recalled ? <LazyLoadImage alt="" src={image} className="w-9 h-9 object-cover" /> : null}
            {otherFileName && !recalled ? (
                <div className="w-9 h-9 flex justify-center items-center text-primary-color bg-[#e3e1fc] dark:bg-[rgba(114,105,239,.15)] rounded">
                    <FileTextFillIcon className="w-4 h-4" />
                </div>
            ) : null}
            {message.sticker && !recalled ? <StickerItem url={message.sticker} className="w-9 h-9" /> : null}
            <div className="flex-1">
                <div className="text-ss font-medium line-clamp-1">{message.sender?.name}</div>
                {subTitle && !recalled ? (
                    <span className="text-secondary dark:text-dark-secondary text-sm">{subTitle}</span>
                ) : null}

                {message.messages?.length || recalled ? (
                    <ChatMessage
                        status={message.deleted}
                        messages={message.messages || []}
                        isMe={isMe}
                        className="line-clamp-1"
                        isReply
                    />
                ) : null}
            </div>

            {showClose ? (
                <span onClick={handleClose} className="absolute top-2 transition-all right-2 hover:text-primary-color">
                    <CloseLineIcon className="w-5 h-5" />
                </span>
            ) : null}
        </div>
    );
};

ReplyMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.shape({
        sender: PropTypes.shape({
            name: PropTypes.string,
        }),
        images: PropTypes.arrayOf(PropTypes.string),
        messages: PropTypes.arrayOf(PropTypes.object),
        sticker: PropTypes.string,
    }).isRequired,
    isMe: PropTypes.bool.isRequired,
    showClose: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
};

export default withErrorBoundary(ReplyMessage, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ReplyMessage::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
