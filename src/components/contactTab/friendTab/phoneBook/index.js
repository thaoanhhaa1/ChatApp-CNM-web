import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { InfoIcon, SearchIcon } from '~/assets';
import Input from '~/components/input';
import Modal from '~/components/modal';
import PhoneBookItem from '~/components/phoneBookItem';
import PopupMultiLevel from '~/components/popupMultiLevel';
import RadioLabelList from '~/components/radioLabelList';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { phoneBookFilter, phoneBookFilterConst } from '~/constants';
import { setContact } from '~/features/addContact/addContactSlice';
import { getPhoneBook, recall } from '~/features/phoneBook/phoneBookSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import Seperate from '../../Seperate';
import AddFriend from './AddFriend';

const PhoneBook = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState(phoneBookFilterConst.ALL);
    const { user } = useSelector((state) => state.user);
    const { phoneBook } = useSelector((state) => state.phoneBook);
    const labels = useMemo(() => Object.keys(phoneBook), [phoneBook]);
    const contactFilter = useMemo(() => {
        if (filter === phoneBookFilterConst.ALL) return phoneBook;
        return labels.reduce(
            (prev, label) => ({ ...prev, [label]: phoneBook[label].filter((contact) => !contact.isFriend) }),
            {},
        );
    }, [filter, labels, phoneBook]);
    const dispatch = useDispatch();

    const handleAddFriend = (contact) => {
        dispatch(setContact(contact));
        dispatch(addSub(AddFriend));

        // TODO Add friend request
    };

    const handleRecall = (contact) => {
        dispatch(recall(contact));

        // TODO Update contact
    };

    useEffect(() => {
        dispatch(getPhoneBook(user.id));
    }, [dispatch, user.id]);

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <PopupMultiLevel onClose={onClickOutside}>
                <Modal.Header onClose={onClickOutside}>{t('contacts.directory')}</Modal.Header>

                <div className="gap-2 flex flex-col px-2 sm:px-3 ex:px-4 py-2 h-[min(600px,80vh)]">
                    <div className="flex gap-x-2 items-center justify-between flex-wrap">
                        <div className="flex gap-2 items-center text-sm">
                            <span>{t('contacts.phone-book.last-update')}</span>
                            <span className="">
                                <InfoIcon className="w-[18px] h-[18px]" />
                            </span>
                        </div>
                        <span className="text-mm font-medium">14/02/2024 08:38</span>
                    </div>
                    <Seperate />
                    <Input Icon={SearchIcon} placeholder={t('contacts.phone-book.search')} />
                    <RadioLabelList
                        className="mt-1"
                        onChange={setFilter}
                        name="phone-book"
                        list={phoneBookFilter.map((item) => ({
                            ...item,
                            label: t(item.label),
                            defaultChecked: filter === item.value,
                        }))}
                    />
                    <div className="h-[1px] bg-separate dark:bg-dark-separate sm:-mx-3 ex:-mx-4 -mx-2"></div>
                    <div className="flex-1 sm:-mx-3 ex:-mx-4 -mx-2">
                        <ScrollbarCustomize>
                            {labels.map((label) => (
                                <Fragment key={label}>
                                    {contactFilter[label].length > 0 && (
                                        <h6 className="px-2 sm:px-4 text-mm text-primary-color font-bold leading-normal">
                                            {label}
                                        </h6>
                                    )}
                                    {contactFilter[label].map((contact) => (
                                        <PhoneBookItem
                                            onAdd={() => handleAddFriend(contact)}
                                            onRecall={() => handleRecall(contact)}
                                            contact={contact}
                                            key={contact.id}
                                        />
                                    ))}
                                </Fragment>
                            ))}
                        </ScrollbarCustomize>
                    </div>
                </div>
            </PopupMultiLevel>
        </Modal>
    );
};

PhoneBook.propTypes = {
    show: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default PhoneBook;
