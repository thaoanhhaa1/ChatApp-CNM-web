import PropTypes from 'prop-types';
import { AppListDetailFillIcon } from '~/assets';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { classNames } from '~/utils';
import ContactItem from './ContactItem';
import SelectedContacts from './SelectedContacts';

const ContactList = ({ chat, selectedContacts, handleClickContact, handleRemoveContact }) => {
    return (
        <div className="flex-1 px-2 ex:px-3 sm:px-4">
            <div className={classNames('flex h-full overflow-hidden gap-2 ex:gap-3')}>
                {chat.length ? (
                    <>
                        <div className="flex-1">
                            <ScrollbarCustomize>
                                {chat.map((item) => (
                                    <ContactItem
                                        key={item._id}
                                        contact={item.user}
                                        checked={selectedContacts.some((i) => i._id === item._id)}
                                        onClick={() => handleClickContact(item)}
                                    />
                                ))}
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
