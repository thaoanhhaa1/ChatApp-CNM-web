import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppListDetailFillIcon } from '~/assets';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { getGroups } from '~/features/contactGroups/contactGroupsSlice';
import { getFriends } from '~/features/friend/friendSlice';
import { classNames, convertContactsToPhoneBook, sortGroupByName } from '~/utils';
import PhoneBook from '../phoneBook';
import PhoneBookSkeleton from '../phoneBook/PhoneBookSkeleton';
import ContactItem from './ContactItem';
import GroupItem from './GroupItem';
import ItemSkeleton from './ItemSkeleton';
import SelectedContacts from './SelectedContacts';

const ContactList = ({ chat, selectedContacts, handleClickContact, handleRemoveContact }) => {
    const { t } = useTranslation();
    const { friendList, friendListLoading } = useSelector((state) => state.friend);
    console.log('🚀 ~ ContactList ~ friendList:', friendList);
    const { groups, loading } = useSelector((state) => state.contactGroups);
    console.log('🚀 ~ ContactList ~ groups:', groups);
    const contacts = convertContactsToPhoneBook(friendList);
    console.log('🚀 ~ ContactList ~ contacts:', contacts);
    const groupsSort = sortGroupByName(groups);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const requests = [];

            if (!friendList.length) requests.push(dispatch(getFriends()));

            if (!groups.length) requests.push(dispatch(getGroups()));

            await Promise.all(requests);
        })();
    }, [dispatch, friendList.length, groups.length]);

    return (
        <div className="flex-1 px-2 ex:px-3 sm:px-4">
            <div className={classNames('flex h-full overflow-hidden gap-2 ex:gap-3')}>
                {chat.length ? (
                    <>
                        <div className="flex-1">
                            <ScrollbarCustomize>
                                {friendListLoading && <PhoneBookSkeleton render={ItemSkeleton} />}
                                <PhoneBook
                                    phoneBook={contacts}
                                    render={(item) => (
                                        <ContactItem
                                            key={item._id}
                                            contact={item}
                                            checked={selectedContacts.some((i) => i._id === item._id)}
                                            onClick={() => handleClickContact(item)}
                                        />
                                    )}
                                />
                                {loading && <PhoneBookSkeleton render={ItemSkeleton} />}
                                <PhoneBook
                                    phoneBook={{
                                        [t('chat.forward.group')]: groupsSort,
                                    }}
                                    render={(item) => (
                                        <GroupItem
                                            key={item._id}
                                            group={item}
                                            checked={selectedContacts.some((i) => i._id === item._id)}
                                            onClick={() => handleClickContact(item)}
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
                            <div className="absolute top-0 left-0 bottom-0 w-[184px] pt-2 sm:pt-3 pb-3 sm:pb-4">
                                <SelectedContacts
                                    handleRemoveContact={handleRemoveContact}
                                    selectedContacts={selectedContacts}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex-1 flex justify-center items-center">
                        <AppListDetailFillIcon className="h-20 w-20" />
                    </div>
                )}
            </div>
        </div>
    );
};

ContactList.propTypes = {
    chat: PropTypes.array.isRequired,
    selectedContacts: PropTypes.array.isRequired,
    handleClickContact: PropTypes.func.isRequired,
    handleRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;
