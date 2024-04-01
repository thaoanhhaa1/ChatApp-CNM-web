import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CloseLineIcon } from '~/assets';
import { classNames } from '~/utils';
import Message from '../message';
import StickerItem from '../sticker/StickerItem';

const ReplyMessage = ({ className, message, isMe, showClose, onClose = () => {}, onClick = () => {} }) => {
    const image = message.images?.[0];

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
            {image && <LazyLoadImage alt="" src={image} className="w-9 h-9 object-cover" />}
            {message.sticker ? <StickerItem url={message.sticker} className="w-9 h-9" /> : null}
            <div className="flex-1">
                <div className="text-ss font-medium line-clamp-1">{message.sender.name}</div>
                {message.sticker ? (
                    <span className="text-secondary dark:text-dark-secondary text-sm">[Sticker]</span>
                ) : (
                    <Message messages={message.messages} isMe={isMe} className="line-clamp-1" isReply />
                )}
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

export default ReplyMessage;
