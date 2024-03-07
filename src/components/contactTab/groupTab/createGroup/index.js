import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CameraFilledIcon, SearchIcon } from '~/assets';
import Input from '~/components/input';
import Modal from '~/components/modal';
import PhoneBook from '~/components/phoneBook';
import PopupMultiLevel from '~/components/popupMultiLevel';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { classNames } from '~/utils';
import ContactItem from './ContactItem';
import SelectedContacts from './SelectedContacts';

const CreateGroup = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const { phoneBook } = useSelector((state) => state.contactsGroup);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [groupName, setGroupName] = useState('');
    const disabled = !groupName || !selectedContacts.length;

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
    };

    const handleChange = (e) => setGroupName(e.target.value);

    const handleCreateGroup = () => {
        if (disabled) return;

        console.group('handleCreateGroup');
        console.log(`groupName::`, groupName);
        console.log(`selectedContacts::`, selectedContacts);
        console.groupEnd();
    };

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <PopupMultiLevel onClose={onClickOutside}>
                <Modal.Header onClose={onClickOutside}>{t('contacts.create-group-modal.title')}</Modal.Header>

                <div className="h-[75vh] flex flex-col">
                    <div className="px-4 pt-4">
                        <div className="flex gap-2.5 items-center">
                            <div className="flex justify-center items-center w-12 h-12 rounded-full text-[#7589a3] border border-[#d6dbe1]">
                                <CameraFilledIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 border-b border-[#d6dbe1] focus-within:border-primary-color">
                                <input
                                    value={groupName}
                                    onChange={handleChange}
                                    placeholder={t('contacts.create-group-modal.enter-group-name')}
                                    type="text"
                                    className="w-full text-sm h-[37px] outline-none placeholder:text-secondary dark:text-dark-secondary"
                                />
                            </div>
                        </div>

                        <Input
                            placeholder={t('contacts.create-group-modal.search-placeholder')}
                            containerClassName="mt-4 focus-within:border-primary-color"
                            Icon={SearchIcon}
                            outline
                            rounded
                        />

                        <div className="mt-5 h-[1px] bg-separate dark:bg-dark-separate" />
                    </div>

                    <div className="flex-1 px-4">
                        <div className="flex h-full gap-3 overflow-hidden">
                            <div className="flex-1">
                                <ScrollbarCustomize>
                                    <PhoneBook
                                        phoneBook={phoneBook}
                                        render={(contact) => (
                                            <ContactItem
                                                key={contact.id}
                                                onClick={() => handleClickContact(contact)}
                                                contact={contact}
                                                checked={selectedContacts.includes(contact)}
                                            />
                                        )}
                                    />
                                </ScrollbarCustomize>
                            </div>
                            <div
                                className={classNames(
                                    'h-full relative transition-all duration-300',
                                    selectedContacts.length ? 'w-[184px]' : 'w-0',
                                )}
                            >
                                <div className="absolute top-0 left-0 bottom-0 w-[184px] pt-3 pb-4">
                                    <SelectedContacts
                                        handleRemoveContact={handleRemoveContact}
                                        selectedContacts={selectedContacts}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal.Footer className="flex justify-end items-center gap-2">
                    <Modal.Button type="text-primary">{t('contacts.create-group-modal.cancel')}</Modal.Button>
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
