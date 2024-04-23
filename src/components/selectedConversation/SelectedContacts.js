import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import SelectedContact from './SelectedContact';

const SelectedContacts = ({ selectedContacts, handleRemoveContact = () => {} }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2 px-3 pt-3 h-full border border-separate dark:border-dark-separate rounded">
            <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{t('contacts.create-group-modal.selected')}</span>
                <span className="rounded px-2 flex items-center text-xs h-5 text-primary-color bg-primary-color bg-opacity-20">
                    {selectedContacts.length}/100
                </span>
            </div>
            <div className="flex-1 -mx-2">
                <ScrollbarCustomize>
                    <div className="flex flex-col gap-1.5 pb-1.5 px-2">
                        {selectedContacts.map((contact) => (
                            <SelectedContact
                                onClose={() => handleRemoveContact(contact)}
                                contact={contact}
                                key={contact._id}
                            />
                        ))}
                    </div>
                </ScrollbarCustomize>
            </div>
        </div>
    );
};

SelectedContacts.propTypes = {
    selectedContacts: PropTypes.array.isRequired,
    handleRemoveContact: PropTypes.func,
};

export default SelectedContacts;
