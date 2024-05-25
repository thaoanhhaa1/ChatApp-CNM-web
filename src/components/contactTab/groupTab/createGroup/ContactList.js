import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { AppListDetailFillIcon } from '~/assets';
import PhoneBook from '~/components/phoneBook';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { classNames, countContactsInPhoneBook, isContactInclude } from '~/utils';
import ContactItem from './ContactItem';
import SelectedContacts from './SelectedContacts';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const ContactList = ({ phoneBook, selectedContacts, addedMembers = [], handleClickContact, handleRemoveContact }) => {
    const countContacts = useMemo(() => countContactsInPhoneBook(phoneBook), [phoneBook]);

    return (
        <div className="flex-1 px-2 ex:px-3 sm:px-4">
            <div className={classNames('flex h-full overflow-hidden', countContacts || 'gap-2 ex:gap-3')}>
                {countContacts ? (
                    <>
                        <div className="flex-1">
                            <ScrollbarCustomize>
                                <PhoneBook
                                    phoneBook={phoneBook}
                                    render={(contact) => (
                                        <ContactItem
                                            key={contact._id}
                                            onClick={() => handleClickContact(contact)}
                                            contact={contact}
                                            checked={selectedContacts.includes(contact)}
                                            added={isContactInclude(addedMembers, contact)}
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
    phoneBook: PropTypes.object.isRequired,
    selectedContacts: PropTypes.array.isRequired,
    addedMembers: PropTypes.array,
    handleClickContact: PropTypes.func.isRequired,
    handleRemoveContact: PropTypes.func.isRequired,
};

export default withErrorBoundary(ContactList, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ContactList::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
