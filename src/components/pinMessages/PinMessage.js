import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ChatTextLineIcon, ChevronDownIcon, FileTextFillIcon, LocationIcon, MoreFillIcon } from '~/assets';
import { removePinMessage } from '~/features/chats/chatsSlice';
import messageServices from '~/services/message.service';
import { classNames, isImageFileByType } from '~/utils';
import ChatMessage from '../chatMessage';
import Popup from '../popup';

const PinMessage = ({ pinCount, message, onMore = () => {}, onClick = () => {} }) => {
    const { t } = useTranslation();
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const fileLength = message.files.length;
    const firstFile = fileLength && message.files[0];
    const isImage = fileLength && isImageFileByType(firstFile.type);
    const imageUrl = isImage && (firstFile.link || URL.createObjectURL(firstFile));
    const locationName = message.location?.name;
    const isOtherFile = firstFile && !isImage;
    const showName = firstFile?.name || isOtherFile || locationName;
    const subTitle = useMemo(() => {
        if (isImage) return t('chats.photo');

        if (firstFile) return 'File';

        if (locationName) return t('chat.location');

        if (message.sticker) return 'Sticker';

        return '';
    }, [firstFile, isImage, locationName, message.sticker, t]);

    const handleUnpin = () => {
        messageServices.unpinMessage(message._id).then();
        dispatch(removePinMessage({ conversationId: active._id, message: message }));
        socket.emit('unpinMessage', { message, userId: user._id, users: active.users });
    };

    const more = [
        {
            title: t('chat.pin-more.copy'),
            separator: true,
        },
        {
            title: t('chat.pin-more.unpin'),
            onClick: handleUnpin,
        },
    ];

    const handleClickMore = (e) => {
        e.stopPropagation();
        onMore();
    };

    return (
        <div
            onClick={onClick}
            className={classNames(
                'group/pin flex px-4 items-center gap-3 h-[50px] cursor-pointer',
                Number.isInteger(pinCount) ||
                    'hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-150',
            )}
        >
            <ChatTextLineIcon className="w-6 h-6 text-primary-color" />
            <div className="flex-1">
                <h5 className="text-ss">Message</h5>
                <div className="line-clamp-1 flex items-center gap-1 text-sm text-secondary dark:text-dark-secondary">
                    <span className="text-nowrap">{message.sender?.name || user.name}:</span>

                    {isImage ? (
                        <img
                            className="flex-shrink-0 w-[18px] aspect-square rounded object-cover"
                            src={imageUrl}
                            alt={firstFile.name}
                        />
                    ) : null}
                    {locationName && <LocationIcon className="flex-shrink-0 w-[18px] h-[18px]" />}
                    {isOtherFile ? <FileTextFillIcon className="flex-shrink-0 w-[18px] h-[18px]" /> : null}

                    {subTitle ? <span>{subTitle}</span> : null}

                    {(showName || message.messages?.length) && subTitle ? <span>•</span> : null}

                    {showName && !message.messages?.length ? (
                        <span className="line-clamp-1">{firstFile?.name || locationName}</span>
                    ) : null}
                    <ChatMessage
                        className="!text-secondary dark:!text-dark-secondary line-clamp-1"
                        messages={message.messages}
                    />
                </div>
            </div>
            <Popup data={more} placement="bottom-end">
                <span className="group-hover/pin:opacity-100 opacity-0 transition-all duration-150 flex justify-center items-center w-8 h-8 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 rounded-full">
                    <MoreFillIcon className="w-5 h-5" />
                </span>
            </Popup>
            {pinCount > 1 ? (
                <div
                    onClick={handleClickMore}
                    className="border border-primary-color rounded-lg flex items-center gap-1 h-6 px-4 text-sm text-primary-color font-medium hover:bg-primary-color hover:bg-opacity-5 transition-all duration-150"
                >
                    <span>{pinCount - 1}</span>
                    <span>more</span>
                    <ChevronDownIcon className="w-4 h-4" />
                </div>
            ) : null}
        </div>
    );
};

PinMessage.propTypes = {
    pinCount: PropTypes.number,
    message: PropTypes.object.isRequired,
    onMore: PropTypes.func,
    onClick: PropTypes.func,
};

export default PinMessage;
