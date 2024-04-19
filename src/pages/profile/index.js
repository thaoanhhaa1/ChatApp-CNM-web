import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { CameraIcon, PencilLineIcon } from '~/assets';
import PersonalInformation from '~/components/addContact/sub/profile/PersonalInformation';
import Avatar from '~/components/avatar';
import Button from '~/components/button';
import Modal from '~/components/modal';
import PopupMultiLevel from '~/components/popupMultiLevel';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { ProfileProvider } from '~/context';
import { addSub, resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { formatDate } from '~/utils';
import EditProfileModal from './EditProfileModal';
import ZoomAvatar from './ZoomAvatar';

const Profile = ({ show, onClose }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [avatar, setAvatar] = useState();

    const handleShowUpdateProfile = () => {
        dispatch(addSub(EditProfileModal));
    };
    const handleClose = () => {
        onClose();
        dispatch(resetSubs());
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setAvatar(selectedImage);
        dispatch(addSub(ZoomAvatar));
    };

    return (
        <ProfileProvider value={{ avatar }}>
            <Modal show={show} onClickOutside={handleClose}>
                <PopupMultiLevel onClose={handleClose}>
                    <Modal.Header onClose={handleClose}>{t('contacts.modal.profile')}</Modal.Header>

                    <div className="h-[calc(min(80vh,540px))] flex flex-col">
                        <ScrollbarCustomize>
                            <LazyLoadImage
                                className="w-full aspect-[400/171] object-cover"
                                src={user.background}
                                alt=""
                            />
                            <div className="px-2 ex:px-3 sm:px-4 -mt-4">
                                <div className="flex gap-2 ex:gap-3 sm:gap-4">
                                    <div className="relative">
                                        <Avatar src={user.avatar} size="60px" />
                                        <span className="absolute bottom-0 right-0 bg-gray-300 hover:bg-gray-500 rounded-full">
                                            <label htmlFor="avatarInput">
                                                <CameraIcon className="w-[24px] h-[24px] p-[3px]" />
                                                <input
                                                    type="file"
                                                    id="avatarInput"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <h3 className="text-lg leading-normal font-medium line-clamp-1">{user.name}</h3>
                                        <span
                                            onClick={handleShowUpdateProfile}
                                            className="p-1 ml-2 cursor-pointer rounded-lg hover:bg-[#dfe2e7] dark:hover:bg-white dark:hover:bg-opacity-5 transition-all"
                                        >
                                            <PencilLineIcon className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-4 border-gray-200 w-full mt-4"></div>

                            <div className="px-2 ex:px-3 sm:px-4 py-2 ex:py-2.5 sm:py-3 bg-white dark:bg-[#242526]">
                                <h4 className="text-base leading-normal font-medium">
                                    {t('contacts.modal.personalInformation')}
                                </h4>
                                <div className="pt-3 flex flex-col gap-2">
                                    <PersonalInformation
                                        label={t('profile.gender')}
                                        value={user.gender === 'male' ? t('profile.male') : t('profile.female')}
                                    />
                                    <PersonalInformation
                                        label={t('profile.date-of-birth')}
                                        value={formatDate(user.dateOfBirth)}
                                    />
                                    <PersonalInformation label={t('profile.email')} value={user._id} />
                                </div>
                                <p className="text-[15px] text-gray-500 mt-4">{t('profile.note')}</p>
                            </div>
                            <div className="border border-gray-300 w-full mt-3 mb-2"></div>

                            <div className="flex items-center justify-center">
                                <Button className="w-full" RightIcon={PencilLineIcon} onClick={handleShowUpdateProfile}>
                                    {t('profile.update')}
                                </Button>
                            </div>
                        </ScrollbarCustomize>
                    </div>
                </PopupMultiLevel>
            </Modal>
        </ProfileProvider>
    );
};

Profile.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Profile;
