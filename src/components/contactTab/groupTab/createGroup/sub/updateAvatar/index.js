import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ImageIcon } from '~/assets';
import Button from '~/components/button';
import Modal from '~/components/modal';
import { constants } from '~/constants';
import { setTempFileAvatar, setUrlAvatar } from '~/features/createGroup/createGroupSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import EditAvatar from '../editAvatar';
import ZoomAvatar from '../zoomAvatar';
import UpdateAvatarItem from './UpdateAvatarItem';

const UpdateAvatar = ({ onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleClickAvatar = (url) => {
        dispatch(setUrlAvatar(url));
        dispatch(addSub(EditAvatar));
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        dispatch(setTempFileAvatar(file));
        dispatch(addSub(ZoomAvatar));
    };

    return (
        <>
            <Modal.Header onClose={onClose} showBack>
                {t('contacts.create-group-modal.update-avatar')}
            </Modal.Header>

            <div className="p-4 min-h-[522px]">
                <label className="flex mt-2 mb-6 cursor-pointer">
                    <input onChange={handleChangeFile} accept="image/*" id="file" type="file" className="hidden" />
                    <Button
                        LeftIcon={ImageIcon}
                        className="pointer-events-none w-full text-primary-color bg-primary-color bg-opacity-20 hover:bg-opacity-30"
                    >
                        {t('contacts.create-group-modal.upload-from-pc')}
                    </Button>
                </label>
                <div>
                    <h4 className="font-medium leading-normal">{t('contacts.create-group-modal.gallery')}</h4>
                    <div className="grid gap-4 grid-cols-5 mt-4">
                        {constants.AVATAR_GROUP_SAMPLE.map((url, index) => (
                            <UpdateAvatarItem onClick={() => handleClickAvatar(url)} key={index} url={url} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

UpdateAvatar.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default UpdateAvatar;
