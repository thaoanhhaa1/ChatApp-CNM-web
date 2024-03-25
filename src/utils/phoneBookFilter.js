const phoneBookFilter = (phoneBook, value, ...fields) => {
    const labels = Object.keys(phoneBook);
    const filter = {};

    labels.forEach((label) => {
        const contacts = phoneBook[label];

        filter[label] = [];

        contacts.forEach(
            (contact) =>
                fields.some((field) => {
                    if (field === 'name')
                        return (contact.alias || contact.name).toUpperCase().includes(value.toUpperCase());

                    return contact[field] === value;
                }) && filter[label].push(contact),
        );
    });

    return filter;
};

export default phoneBookFilter;
