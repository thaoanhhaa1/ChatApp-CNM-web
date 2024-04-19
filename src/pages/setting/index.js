import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LockIcon1, PencilLineIcon, SettingIcon } from '~/assets';
import Button from '~/components/button';
import Modal from '~/components/modal';
import PopupMultiLevel from '~/components/popupMultiLevel';
import { reset } from '~/features/addContact/addContactSlice';
import GeneralSettings from './generalSettings';
import Privacy from './privacySecurity';
import UpdatePassword from './privacySecurity/updatePassword';

const Setting = ({ show, onClose }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { subs } = useSelector((state) => state.popupMultiLevel);
    useEffect(() => {
        subs.length || dispatch(reset());
    }, [dispatch, subs.length]);

    const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);

    const handleClose = () => {
        onClose();
        dispatch(reset());
    };

    const items = [
        { label: t('settings.general'), icon: SettingIcon },
        { label: t('settings.privacy_security'), icon: LockIcon1 },
        { label: t('settings.sync_messages'), icon: PencilLineIcon },
        { label: t('settings.resource_management'), icon: PencilLineIcon },
        { label: t('settings.theme'), icon: PencilLineIcon },
        { label: t('settings.notification'), icon: PencilLineIcon },
        { label: t('settings.message'), icon: PencilLineIcon },
        { label: t('settings.call_settings'), icon: PencilLineIcon },
        { label: t('settings.utililties'), icon: PencilLineIcon },
        { label: t('settings.proxy'), icon: PencilLineIcon },
    ];

    const [currentContentType, setCurrentContentType] = useState(null);

    const handleItemClick = (contentType) => {
        setCurrentContentType(contentType);
    };
    const handleOpenUpdatePasswordModal = () => {
        setIsUpdatePasswordOpen(true);
    };

    return (
        <Modal show={show} onClickOutside={handleClose}>
            <PopupMultiLevel onClose={handleClose}>
                <Modal.Header onClose={handleClose}>{t('settings.title')}</Modal.Header>
                <div className="relative">
                    <div className="flex h-[calc(min(600px,80vh)-45px)]">
                        <div className="w-1.25/3 border-r border-gray-300 bg-gray-100">
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index} onClick={() => handleItemClick(item.label)}>
                                        <Button
                                            align="left"
                                            className="w-full text-sm"
                                            LeftIcon={item.icon}
                                            iconClassName="w-[15px]"
                                        >
                                            {item.label}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-2.57/3 p-4">
                            {currentContentType === t('settings.general') && <GeneralSettings />}
                            {currentContentType === t('settings.privacy_security') && (
                                <Privacy handle={handleOpenUpdatePasswordModal} />
                            )}
                            {isUpdatePasswordOpen && (
                                <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 ">
                                    <div className="bg-white p-6 rounded-lg">
                                        <UpdatePassword onClose={() => setIsUpdatePasswordOpen(false)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </PopupMultiLevel>
        </Modal>
    );
};

Setting.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Setting;
