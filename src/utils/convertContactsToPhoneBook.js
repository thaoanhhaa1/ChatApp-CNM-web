const getNameZalo = (contact) => contact.alias || contact.name;

const convertContactsToPhoneBook = (contacts) => {
    const contactsSort = [...contacts].sort((firstContact, secondContact) =>
        getNameZalo(firstContact).localeCompare(getNameZalo(secondContact)),
    );

    const phoneBook = {};

    contactsSort.forEach((contact) => {
        const firstCharOfName = (contact.alias || contact.name)[0].toUpperCase();

        if (phoneBook[firstCharOfName]) phoneBook[firstCharOfName].push(contact);
        else phoneBook[firstCharOfName] = [contact];
    });

    return phoneBook;
};

export default convertContactsToPhoneBook;
