import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AppListDetailFillIcon } from '~/assets';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { classNames, convertContactsToPhoneBook, sortGroupByName } from '~/utils';
import PhoneBook from '../phoneBook';
import ContactItem from './ContactItem';
import GroupItem from './GroupItem';
import SelectedContacts from './SelectedContacts';

const ContactList = ({ contacts, groups, selectedContacts, handleClickContact, handleRemoveContact }) => {
    const { t } = useTranslation();
    const groupsSort = sortGroupByName(groups);
    const phoneBook = convertContactsToPhoneBook(contacts);

    return (
        <div className="flex-1 px-2 ex:px-3 sm:px-4">
            <div className={classNames('flex h-full overflow-hidden gap-2 ex:gap-3')}>
                <div className="flex-1 relative">
                    <ScrollbarCustomize>
                        <PhoneBook
                            phoneBook={phoneBook}
                            render={(item) => (
                                <ContactItem
                                    key={item._id}
                                    contact={item}
                                    checked={selectedContacts.some((i) => i._id === item._id)}
                                    onClick={() => handleClickContact(item)}
                                />
                            )}
                        />
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
                    {contacts.length + groups.length === 0 && (
                        <div className="absolute inset-0 h-full flex-1 flex justify-center items-center">
                            <AppListDetailFillIcon className="h-20 w-20" />
                        </div>
                    )}
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
            </div>
        </div>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    selectedContacts: PropTypes.array.isRequired,
    handleClickContact: PropTypes.func.isRequired,
    handleRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;
