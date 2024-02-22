import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UserCircleBrokenIcon } from '~/assets';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import Button from '../button';
import Modal from '../modal';
import PhoneInput from '../phoneInput';
import PopupMultiLevel from '../popupMultiLevel';
import ScrollbarCustomize from '../scrollbarCustomize';
import Contact from './Contact';
import ContactList from './ContactList';
import { Profile } from './sub';

const contacts = [
    {
        id: '1',
        avatar: 'https://images.unsplash.com/photo-1704186776780-19672ed2019a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Thị Thơm',
        phone: '(+84) 0369 167 234',
    },
    {
        id: '2',
        avatar: 'https://images.unsplash.com/photo-1704186776780-19672ed2019a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Thị Thơm',
        phone: '(+84) 0369 167 234',
    },
    {
        id: '3',
        avatar: 'https://images.unsplash.com/photo-1704186776780-19672ed2019a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Thị Thơm',
        phone: '(+84) 0369 167 234',
    },
];

const AddContact = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState();
    const dispatch = useDispatch();

    const handleClickContact = (contact) => {
        console.log('handleClickContact');
    };
    const handleClickAddFriend = (contact, e) => {
        e.stopPropagation();
        console.log('handleClickAddFriend');
    };
    const handleClickClose = (contact, e) => {
        e.stopPropagation();
        console.log('handleClickClose');
    };

    const handleClickSearch = () => {
        console.group('Search');
        console.log('🚀 ~ handleClickSearch ~ phone:', phone);
        console.groupEnd();

        dispatch(addSub(Profile));
    };

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <PopupMultiLevel onClose={onClickOutside}>
                <Modal.Header onClose={onClickOutside}>{t('contacts.add-contact')}</Modal.Header>

                <div className="p-2 ex:p-4 flex flex-col gap-2 ex:gap-4 sn:gap-6">
                    <PhoneInput value={phone} setValue={setPhone} />
                </div>

                <div className="h-[min(350px,60vh)] overflow-auto">
                    <ScrollbarCustomize>
                        <ContactList title={t('contacts.modal.recentSearches')}>
                            {contacts.map((contact) => (
                                <Contact
                                    key={contact.id}
                                    onClick={(e) => handleClickContact(contact, e)}
                                    avatar={contact.avatar}
                                    name={contact.name}
                                    description={contact.phone}
                                    onClose={(e) => handleClickClose(contact, e)}
                                />
                            ))}
                        </ContactList>
                        <ContactList Icon={UserCircleBrokenIcon} title={t('contacts.modal.youMayKnow')}>
                            {contacts.map((contact) => (
                                <Contact
                                    key={contact.id}
                                    onClick={(e) => handleClickContact(contact, e)}
                                    avatar={contact.avatar}
                                    name={contact.name}
                                    description={contact.phone}
                                    onClose={(e) => handleClickClose(contact, e)}
                                    right={
                                        <Button onClick={(e) => handleClickAddFriend(contact, e)} outline primary small>
                                            {t('contacts.modal.addFriend')}
                                        </Button>
                                    }
                                />
                            ))}
                        </ContactList>
                    </ScrollbarCustomize>
                </div>

                <Modal.Footer className="flex justify-end items-center gap-2">
                    <Modal.Button onClick={onClickOutside} type="text-primary">
                        {t('contacts.modal.close')}
                    </Modal.Button>
                    <Modal.Button onClick={handleClickSearch}>{t('contacts.modal.search')}</Modal.Button>
                </Modal.Footer>
            </PopupMultiLevel>
        </Modal>
    );
};

AddContact.propTypes = {
    show: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default AddContact;
