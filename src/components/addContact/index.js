import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { UserCircleBrokenIcon } from '~/assets';
import { reset, searchUser, setEmail } from '~/features/addContact/addContactSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { setToast } from '~/features/toastAll/toastAllSlice';
import Button from '../button';
import Input from '../input';
import Modal from '../modal';
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

// TODO
const AddContact = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const { email, searchLoading } = useSelector((state) => state.addContact);
    const { subs } = useSelector((state) => state.popupMultiLevel);
    const [showMore, setShowMore] = useState(false);
    const isValidContactSearch = useMemo(() => validator.isEmail(email), [email]);
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

    const handleClickSearch = async () => {
        const res = await dispatch(searchUser({ search: email })).unwrap();

        if (res) dispatch(addSub(Profile));
        else dispatch(setToast(t('contacts.alert-search')));
    };

    // const handleChangePhone = (phone) => dispatch(setPhone(phone));
    const handleChangeEmail = (email) => dispatch(setEmail(email));

    const handleClose = () => {
        onClickOutside();
        dispatch(reset());
    };

    const handleClickViewMore = () => setShowMore(true);

    useEffect(() => {
        subs.length || dispatch(reset());
    }, [dispatch, subs.length]);

    return (
        <Modal show={show} onClickOutside={handleClose}>
            <PopupMultiLevel onClose={handleClose}>
                <Modal.Header onClose={handleClose}>{t('contacts.add-contact')}</Modal.Header>

                {/* <PhoneInput className="p-2 ex:p-3 sm:p-4" value={phone} setValue={handleChangePhone} /> */}
                <Input
                    containerClassName="m-2 ex:m-3 sm:m-4"
                    type="email"
                    outline
                    placeholder={t('contacts.enter-email')}
                    value={email}
                    onChangeText={handleChangeEmail}
                />

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
                        {showMore || (
                            <div className="h-[30px] flex items-center">
                                <div
                                    onClick={handleClickViewMore}
                                    className="cursor-pointer pl-2 ex:pl-3 sm:pl-4 text-ss leading-normal text-primary-color"
                                >
                                    View more
                                </div>
                            </div>
                        )}
                    </ScrollbarCustomize>
                </div>

                <Modal.Footer className="flex justify-end items-center gap-2">
                    <Modal.Button onClick={handleClose} type="text-primary">
                        {t('contacts.modal.close')}
                    </Modal.Button>
                    <Modal.Button
                        disabled={!isValidContactSearch || searchLoading}
                        loading={searchLoading}
                        onClick={handleClickSearch}
                    >
                        {t('contacts.modal.search')}
                    </Modal.Button>
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
