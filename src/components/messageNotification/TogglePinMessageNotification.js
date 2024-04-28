import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import images from '~/assets/images';
import { messageNotificationType } from '~/constants';
import { isImageFileByType } from '~/utils';
import CommonNotification from './CommonNotification';

const TogglePinMessageNotification = ({ message, type }) => {
    const isPin = type === messageNotificationType.PIN_MESSAGE;
    const { t } = useTranslation();
    const joinedMessage = useMemo(() => {
        const { files, location, messages, sticker } = message.notification.message;
        console.log('🚀 ~ joinedMessage ~ messages:', messages);

        const joinedMessage = (messages || [])
            .map((item) => {
                if (item.type === 'text') return item.content.trim();

                return `@${item.content}`;
            })
            .join(' ');

        const firstFile = files[0];
        const firstImage = firstFile && isImageFileByType(firstFile.type || firstFile.contentType);

        if (isPin) {
            if (location) return t('message-notification.message.pin.location');
            if (sticker) return t('message-notification.message.pin.sticker');

            if (firstImage && joinedMessage)
                return `${t('message-notification.message.pin.text-image')} ${joinedMessage}`;
            if (joinedMessage) return `${t('message-notification.message.pin.text')} ${joinedMessage}`;
            if (firstImage) return t('message-notification.message.pin.image');
            if (firstFile && !firstImage) return `${t('message-notification.message.pin.file')} ${firstFile.name}`;
        }
        if (!isPin) {
            if (location) return t('message-notification.message.unpin.location');
            if (sticker) return t('message-notification.message.unpin.sticker');

            if (firstImage && joinedMessage)
                return `${t('message-notification.message.unpin.text-image')} ${joinedMessage}`;
            if (joinedMessage) return `${t('message-notification.message.unpin.text')} ${joinedMessage}`;
            if (firstImage) return t('message-notification.message.unpin.image');
            if (firstFile && !firstImage) return `${t('message-notification.message.unpin.file')} ${firstFile.name}`;
        }

        return '';
    }, [isPin, message.notification.message, t]);

    return (
        <>
            <CommonNotification
                img={isPin ? images.pinMessage : images.unpinMessage}
                data={[[message.sender], joinedMessage]}
            />
            {/* TODO */}
            {/* {type === messageNotificationType.PIN_MESSAGE && (
                <span className="cursor-pointer text-ss text-primary-color">
                    {t('message-notification.message.view')}
                </span>
            )} */}
        </>
    );
};

TogglePinMessageNotification.propTypes = {
    message: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

export default TogglePinMessageNotification;
