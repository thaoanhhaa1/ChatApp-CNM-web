import { useDebounce } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { SearchIcon } from '~/assets';
import { classNames } from '~/utils';
import Input from '../input';
import ContactList from './ContactList';

const SelectedConversation = ({
    contacts = [],
    groups = [],
    className,
    showSearch,
    searchPlaceholder = '',
    showSelected,
    selectedContacts,
    setSelectedContacts,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const searchDebounce = useDebounce(searchValue, 500);
    const [contactsFilter, groupsFilter] = useMemo(() => {
        const searchLower = (searchDebounce || '').toLowerCase();
        const contactsFilter = contacts.filter((contact) => contact.name.toLowerCase().includes(searchLower));
        const groupsFilter = groups.filter((group) => group.name.toLowerCase().includes(searchLower));

        return [contactsFilter, groupsFilter];
    }, [contacts, groups, searchDebounce]);

    const handleClickContact = (contact) => {
        const index = selectedContacts.findIndex((item) => item._id === contact._id);

        if (index > -1) handleRemoveContact(contact);
        else setSelectedContacts((contacts) => [...contacts, contact]);
        setSearchValue('');
    };

    const handleRemoveContact = (contact) => {
        const index = selectedContacts.findIndex((item) => item._id === contact._id);

        setSelectedContacts((contacts) => {
            const newContacts = [...contacts];

            newContacts.splice(index, 1);

            return newContacts;
        });
    };

    useEffect(() => {
        if (!showSelected) {
            setSelectedContacts([]);
            setSearchValue('');
        }
    }, [setSearchValue, setSelectedContacts, showSelected]);

    return (
        <div className={classNames('flex flex-col', className)}>
            {showSearch && (
                <div className="px-2 ex:px-3 smn:px-4 pt-2 ex:pt-3">
                    <Input
                        placeholder={searchPlaceholder}
                        containerClassName="focus-within:border-primary-color dark:focus-within:border-primary-color"
                        Icon={SearchIcon}
                        outline
                        rounded
                        value={searchValue}
                        onChangeText={setSearchValue}
                    />

                    <div className="mt-2 ex:mt-3 h-[1px] bg-separate dark:bg-dark-separate" />
                </div>
            )}

            <ContactList
                handleClickContact={handleClickContact}
                handleRemoveContact={handleRemoveContact}
                selectedContacts={selectedContacts}
                groups={groupsFilter}
                contacts={contactsFilter}
            />
        </div>
    );
};

SelectedConversation.propTypes = {
    contacts: PropTypes.array,
    groups: PropTypes.array,
    className: PropTypes.string,
    showSearch: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    showSelected: PropTypes.bool,
    selectedContacts: PropTypes.array.isRequired,
    setSelectedContacts: PropTypes.func.isRequired,
};

export default SelectedConversation;
