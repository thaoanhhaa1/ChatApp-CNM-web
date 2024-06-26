import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, sendMessage } from '~/features/messages/messagesSlice';
import { popSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { useLoader } from '~/hooks';
import { googleMaps } from '~/utils';
import Avatar from '../avatar';
import Modal from '../modal';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const Detail = ({ onClose = () => {} }) => {
    const { t } = useTranslation();
    const { location } = useSelector((state) => state.location);
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { google, places, marker } = useLoader();
    const dispatch = useDispatch();

    const handleCancel = () => dispatch(popSub());
    const handleSend = () => {
        const timeSend = Date.now();

        dispatch(
            sendMessage({
                conversationId: active._id,
                timeSend,
                location,
                sender: user,
            }),
        );
        dispatch(
            addMessage({
                sender: user,
                conversationId: active._id,
                timeSend,
            }),
        );
        onClose();
    };

    useEffect(() => {
        (async () => {
            if (!places?.PlacesService || !marker?.AdvancedMarkerElement) return;

            googleMaps(location, google, marker, document.querySelector('#map-detail'));
        })();
    }, [google, location, marker, places]);

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('location.send-to')} {active.name}?
            </Modal.Header>

            <div className="flex flex-col">
                <div id="map-detail" className="h-[200px] flex-shrink-0"></div>
                <div className="h-full flex items-center gap-3 p-2 ex:p-3 sm:p-4">
                    <Avatar src={location.icon} />
                    <p className="text-sm text-secondary dark:text-dark-secondary">{location.vicinity}</p>
                </div>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button type="text-primary" onClick={handleCancel}>
                    {t('location.cancel')}
                </Modal.Button>
                <Modal.Button type="primary" onClick={handleSend}>
                    {t('location.send')}
                </Modal.Button>
            </Modal.Footer>
        </>
    );
};

Detail.propTypes = {
    onClose: PropTypes.func,
};

export default withErrorBoundary(Detail, {
    fallback: null,
    onError: (error, info) => {
        toast.error('Detail::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
