import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CropImage from '~/components/cropImage';
import Modal from '~/components/modal';
import { setFileAvatar } from '~/features/createGroup/createGroupSlice';
import { resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';

const ZoomAvatar = ({ onClose }) => {
    const { t } = useTranslation();
    const { avatar } = useSelector((state) => state.createGroup);
    const imageUrl = useMemo(() => URL.createObjectURL(avatar.tempFile), [avatar.tempFile]);
    const cropImageRef = useRef();
    const dispatch = useDispatch();

    const handleClose = () => dispatch(resetSubs());

    const handleUpdateAvatar = async () => {
        const cropImage = cropImageRef.current;

        if (!cropImage) return;

        const blob = await cropImage.getImageFile();

        dispatch(setFileAvatar(blob));
        dispatch(resetSubs());
    };

    return (
        <>
            <Modal.Header onClose={onClose} showBack>
                {t('contacts.create-group-modal.update-avatar')}
            </Modal.Header>

            <CropImage ref={cropImageRef} imageUrl={imageUrl} />

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleClose} type="text-primary">
                    {t('contacts.create-group-modal.cancel')}
                </Modal.Button>
                <Modal.Button onClick={handleUpdateAvatar}>{t('contacts.create-group-modal.update')}</Modal.Button>
            </Modal.Footer>
        </>
    );
};

ZoomAvatar.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default withErrorBoundary(ZoomAvatar, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ZoomAvatar::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
