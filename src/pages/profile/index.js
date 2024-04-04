import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AttachmentLineIcon, BlockIcon, More2FillIcon, PencilLineIcon, RecordCircleFillIcon, UserIcon, WarningIcon } from '~/assets';
import Accordion from '~/components/accordion';
import AttachedFile from '~/components/attachedFile';
import Avatar from '~/components/avatar';
import Button from '~/components/button';
import About from '~/components/chat/profile/About';
import FormControl from '~/components/formControl';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';

import ScrollbarCustomize from '~/components/scrollbarCustomize';
import PropTypes from 'prop-types';
import Modal from '~/components/modal';
import ProfileHeader from '~/components/addContact/sub/ProfileHeader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PersonalInformation from '~/components/addContact/sub/profile/PersonalInformation';
import EditProfileModal from './EditProfileModal';
import { useDispatch } from 'react-redux';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import PopupMultiLevel from '~/components/popupMultiLevel';
import { reset } from '~/features/addContact/addContactSlice';
import { useSelector } from 'react-redux';

const Profile = ({onClose}) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { subs } = useSelector((state) => state.popupMultiLevel);

    const handleShowUpdateProfile = () => {

        dispatch(addSub(EditProfileModal));
    };
    const handleClose = () => {
        onClose();
        dispatch(reset());
    };

    useEffect(() => {
        subs.length || dispatch(reset());
    }, [dispatch, subs.length]);

    return (
        <>
            <Modal show={true} onClickOutside={handleClose}>
            <PopupMultiLevel onClose={handleClose}>
                <Modal.Header onClose={handleClose}>
                    {t('contacts.modal.profile')}
                </Modal.Header>
                
                {/* <div className="text-center flex flex-col items-center gap-2 justify-center"> */}
                    <LazyLoadImage className="w-full aspect-[400/171] object-cover" src={user.background} alt="" />

                    <div className="h-[calc(min(380px,80vh)-45px)]">
                        <div className="px-2 ex:px-3 sm:px-4 -mt-4">
                            <div className="flex gap-2 ex:gap-3 sm:gap-4">
                                <div className="relative">
                                    <Avatar src={user.avatar} size="60px" />
                                </div>
                                <div className="flex items-center">
                                    <h3 className="text-lg leading-normal font-medium line-clamp-1">
                                        {user.name}
                                    </h3>
                                    <span
                                        // onClick={handleChangeAlias}
                                        className="p-1 ml-2 cursor-pointer rounded-lg hover:bg-[#dfe2e7] dark:hover:bg-white dark:hover:bg-opacity-5 transition-all"
                                    >
                                        <PencilLineIcon className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="border-b-4 border-gray-200 w-full mt-4"></div>
                        
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
                                value={user.dateOfBirth}
                                />
                                <PersonalInformation
                                label={t('profile.email')}
                                value={user._id}
                                />
                            </div>
                            <p className='text-[15px] text-gray-500 mt-4'>{t('profile.note')}</p>
                        </div>
                        <div class="border border-gray-300 w-full mt-3 mb-2"></div>

                        <div className="flex items-center justify-center">
                        {/* {showEditModal && <EditProfileModal user={user} onClose={() => setShowEditModal(false)} />} */}
                            <Button className="w-full" RightIcon={PencilLineIcon} onClick={handleShowUpdateProfile}>
                                {t('profile.update')}
                            </Button>
                        </div>

                    </div>
            </PopupMultiLevel>
            </Modal>
        </>
    )


};

Profile.propTypes = {
    onClose: PropTypes.func,
    user: PropTypes.object.isRequired,
};

export default Profile;
