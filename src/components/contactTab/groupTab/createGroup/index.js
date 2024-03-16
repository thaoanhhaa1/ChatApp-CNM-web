import { useDebounce } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CameraFilledIcon, SearchIcon } from '~/assets';
import Input from '~/components/input';
import Modal from '~/components/modal';
import Popup from '~/components/popup';
import PopupMultiLevel from '~/components/popupMultiLevel';
import { resetAvatar, setUrlAvatar } from '~/features/createGroup/createGroupSlice';
import { addSub, resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { phoneBookFilter } from '~/utils';
import ContactList from './ContactList';
import UpdateAvatar from './sub/updateAvatar';

const CreateGroup = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const { phoneBook } = useSelector((state) => state.contactsGroup);
    const { avatar } = useSelector((state) => state.createGroup);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [search, setSearch] = useState('');
    const searchDebounce = useDebounce(search, 500);
    const phoneBookFilterResult = useMemo(
        () => phoneBookFilter(phoneBook, searchDebounce, 'name', 'phone'),
        [phoneBook, searchDebounce],
    );
    const dispatch = useDispatch();
    const disabled = selectedContacts.length < 2;
    const handleClickCamera = useCallback(() => dispatch(addSub(UpdateAvatar)), [dispatch]);
    const actionAvatarCreateGroup = useMemo(
        () => [
            {
                title: 'contacts.create-group-modal.change-avatar',
                onClick: handleClickCamera,
            },
            {
                title: 'contacts.create-group-modal.delete-avatar',
                onClick: () => dispatch(setUrlAvatar()),
            },
        ],
        [dispatch, handleClickCamera],
    );
    const imageUrl = useMemo(() => avatar.file && URL.createObjectURL(avatar.file), [avatar.file]);

    const handleRemoveContact = (contact) => {
        const index = selectedContacts.findIndex((item) => item.id === contact.id);

        setSelectedContacts((contacts) => {
            const newContacts = [...contacts];

            newContacts.splice(index, 1);

            return newContacts;
        });
    };

    const handleClickContact = (contact) => {
        const index = selectedContacts.findIndex((item) => item.id === contact.id);

        if (index > -1) handleRemoveContact(contact);
        else setSelectedContacts((contacts) => [...contacts, contact]);
        setSearch('');
    };

    const handleChange = (e) => setGroupName(e.target.value);

    const handleCreateGroup = () => {
        if (disabled) return;

        console.group('handleCreateGroup');
        console.log(`groupName::`, groupName);
        console.log(`selectedContacts::`, selectedContacts);
        console.groupEnd();
    };

    const handleLoad = () => URL.revokeObjectURL(imageUrl);

    const handleClickOutside = () => {
        onClickOutside();
        dispatch(resetAvatar());
        dispatch(resetSubs());
    };

    useLayoutEffect(() => setSelectedContacts([]), [show]);

    return (
        <Modal show={show} onClickOutside={handleClickOutside}>
            <PopupMultiLevel onClose={handleClickOutside}>
                <Modal.Header onClose={handleClickOutside}>{t('contacts.create-group-modal.title')}</Modal.Header>

                <div className="h-[75vh] flex flex-col">
                    <div className="px-2 ex:px-3 smn:px-4 pt-2 ex:pt-3 smn:pt-4">
                        <div className="flex gap-2 ex:gap-2.5 items-center">
                            <div className="relative w-12 h-12 rounded-full text-[#7589a3] border border-[#d6dbe1] dark:border-[#3d3f40]">
                                <div
                                    onClick={handleClickCamera}
                                    className="cursor-pointer rounded-full flex justify-center items-center w-full h-full"
                                >
                                    <CameraFilledIcon className="w-6 h-6" />
                                </div>

                                {(avatar.url || imageUrl) && (
                                    <Popup
                                        placement="bottom"
                                        data={actionAvatarCreateGroup.map((item) => ({
                                            ...item,
                                            title: t(item.title),
                                        }))}
                                    >
                                        <img
                                            src={avatar.url || imageUrl}
                                            className="cursor-pointer absolute top-0 left-0 w-full h-full object-cover rounded-full"
                                            alt=""
                                            onLoad={handleLoad}
                                        />
                                    </Popup>
                                )}
                            </div>
                            <div className="flex-1 border-b border-[#d6dbe1] dark:border-[#3d3f40] focus-within:border-primary-color dark:focus-within:border-primary-color">
                                <input
                                    value={groupName}
                                    onChange={handleChange}
                                    placeholder={t('contacts.create-group-modal.enter-group-name')}
                                    type="text"
                                    className="bg-transparent w-full text-sm h-[37px] outline-none placeholder:text-secondary dark:text-dark-secondary"
                                />
                            </div>
                        </div>

                        <Input
                            placeholder={t('contacts.create-group-modal.search-placeholder')}
                            containerClassName="mt-2 ex:mt-3 sm:mt-4 focus-within:border-primary-color dark:focus-within:border-primary-color"
                            Icon={SearchIcon}
                            outline
                            rounded
                            value={search}
                            onChangeText={setSearch}
                        />

                        <div className="mt-2.5 ex:mt-3.5 sm:mt-5 h-[1px] bg-separate dark:bg-dark-separate" />
                    </div>

                    <ContactList
                        handleClickContact={handleClickContact}
                        handleRemoveContact={handleRemoveContact}
                        phoneBook={phoneBookFilterResult}
                        selectedContacts={selectedContacts}
                    />
                </div>

                <Modal.Footer className="flex justify-end items-center gap-2">
                    <Modal.Button onClick={handleClickOutside} type="text-primary">
                        {t('contacts.create-group-modal.cancel')}
                    </Modal.Button>
                    <Modal.Button onClick={handleCreateGroup} disabled={disabled}>
                        {t('contacts.create-group-modal.create-group')}
                    </Modal.Button>
                </Modal.Footer>
            </PopupMultiLevel>
        </Modal>
    );
};

CreateGroup.propTypes = {
    show: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default CreateGroup;
