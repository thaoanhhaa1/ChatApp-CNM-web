import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { UserCircleBrokenIcon } from '~/assets';
import { reset, searchUser, setContact, setEmail } from '~/features/addContact/addContactSlice';
import { getSuggestFriends } from '~/features/friend/friendSlice';
import {
    addIgnoreSuggestFriends,
    addRecentSearch,
    removeRecentSearch,
} from '~/features/localSetting/localSettingSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { setToast } from '~/features/toastAll/toastAllSlice';
import Button from '../button';
import Input from '../input';
import List from '../list';
import Modal from '../modal';
import PopupMultiLevel from '../popupMultiLevel';
import ScrollbarCustomize from '../scrollbarCustomize';
import Skeleton from '../skeleton';
import Contact from './Contact';
import ContactList from './ContactList';
import ContactSkeleton from './ContactSkeleton';
import { Profile } from './sub';
import AddFriend from './sub/addFriend';

// TODO Can you know
const AddContact = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const { email, searchLoading } = useSelector((state) => state.addContact);
    const { subs } = useSelector((state) => state.popupMultiLevel);
    const { settings } = useSelector((state) => state.localSetting);
    const { suggestFriends, loadingSuggestFriends, suggestFriendsFirstFetch } = useSelector((state) => state.friend);
    const [showMore, setShowMore] = useState(false);
    const isValidContactSearch = useMemo(() => validator.isEmail(email), [email]);
    const dispatch = useDispatch();
    const suggestShow = useMemo(() => {
        const ignoreSuggestFriends = settings?.ignoreSuggestFriends || [];

        const ignoredFriends = suggestFriends.filter((friend) => !ignoreSuggestFriends.includes(friend._id));

        if (showMore) return ignoredFriends;
        return ignoredFriends.slice(0, 3);
    }, [settings?.ignoreSuggestFriends, showMore, suggestFriends]);

    const handleClickContact = (contact) => {
        dispatch(setContact(contact));
        dispatch(addSub(Profile));
    };

    const handleClickAddFriend = (contact, e) => {
        e.stopPropagation();
        dispatch(setContact(contact));
        dispatch(addSub(AddFriend));
    };

    // TODO Remove in DB
    const handleClickClose = (contact, e) => {
        e.stopPropagation();

        dispatch(removeRecentSearch(contact._id));
        dispatch(addIgnoreSuggestFriends(contact._id));
    };

    const handleClickSearch = async () => {
        const res = await dispatch(searchUser({ search: email })).unwrap();

        if (res) {
            dispatch(addSub(Profile));
            dispatch(addRecentSearch(res));
        } else dispatch(setToast(t('contacts.alert-search')));
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

    useEffect(() => {
        if (!show) return;

        suggestFriendsFirstFetch || dispatch(getSuggestFriends());
    }, [dispatch, show, suggestFriendsFirstFetch]);

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
                        {settings?.recentSearch?.length ? (
                            <ContactList title={t('contacts.modal.recentSearches')}>
                                {settings.recentSearch.map((contact) => (
                                    <Contact
                                        key={contact._id}
                                        onClick={(e) => handleClickContact(contact, e)}
                                        avatar={contact.avatar}
                                        name={contact.name}
                                        description={contact._id}
                                        onClose={(e) => handleClickClose(contact, e)}
                                    />
                                ))}
                            </ContactList>
                        ) : null}
                        {(loadingSuggestFriends && (
                            <>
                                <Skeleton
                                    width="60%"
                                    height={14}
                                    containerClassName="flex items-center h-[30px] pl-2 ex:pl-3 sm:pl-4"
                                />
                                <List length={3} control={ContactSkeleton} />
                            </>
                        )) || (
                            <>
                                <ContactList Icon={UserCircleBrokenIcon} title={t('contacts.modal.youMayKnow')}>
                                    {suggestShow.map((contact) => (
                                        <Contact
                                            key={contact._id}
                                            onClick={(e) => handleClickContact(contact, e)}
                                            avatar={contact.avatar}
                                            name={contact.name}
                                            description={contact._id}
                                            onClose={(e) => handleClickClose(contact, e)}
                                            right={
                                                <Button
                                                    onClick={(e) => handleClickAddFriend(contact, e)}
                                                    outline
                                                    primary
                                                    small
                                                >
                                                    {t('contacts.modal.addFriend')}
                                                </Button>
                                            }
                                        />
                                    ))}
                                </ContactList>
                                {showMore ||
                                    (suggestFriends.length > 3 && (
                                        <div className="h-[30px] flex items-center">
                                            <div
                                                onClick={handleClickViewMore}
                                                className="cursor-pointer pl-2 ex:pl-3 sm:pl-4 text-ss leading-normal text-primary-color"
                                            >
                                                View more
                                            </div>
                                        </div>
                                    ))}
                            </>
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
