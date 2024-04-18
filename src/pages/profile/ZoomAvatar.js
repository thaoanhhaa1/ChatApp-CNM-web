import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CropImage from '~/components/cropImage';
import Modal from '~/components/modal';
import { useProfile } from '~/context';
import { popSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { setUser } from '~/features/user/userSlice';
import userServices from '~/services/user.service';

const ZoomAvatar = ({ onClose }) => {
    const { t } = useTranslation();
    const { avatar } = useProfile();
    const imageUrl = useMemo(() => avatar && URL.createObjectURL(avatar), [avatar]);
    const cropImageRef = useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleUpdateAvatar = async () => {
        setLoading(true);

        try {
            const cropImage = cropImageRef.current;

            if (!cropImage) return;

            const blob = await cropImage.getImageFile();

            const formData = new FormData();
            formData.append('avatar', blob);

            const res = await userServices.updateAvatar(formData);

            dispatch(setUser(res.data));
            dispatch(popSub());
        } catch (error) {
            console.error(error);

            toast.error(t('profile.update-avatar-fail'));
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => dispatch(popSub());

    useEffect(() => {
        avatar || dispatch(popSub());
    }, [avatar, dispatch]);

    return (
        <>
            <Modal.Header onClose={onClose} showBack>
                {t('contacts.create-group-modal.update-avatar')}
            </Modal.Header>

            <CropImage ref={cropImageRef} imageUrl={imageUrl} />

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button disabled={loading} onClick={handleCancel} type="text-primary">
                    {t('contacts.create-group-modal.cancel')}
                </Modal.Button>
                <Modal.Button loading={loading} disabled={loading} onClick={handleUpdateAvatar}>
                    {t('contacts.create-group-modal.update')}
                </Modal.Button>
            </Modal.Footer>
        </>
    );
};

ZoomAvatar.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ZoomAvatar;
