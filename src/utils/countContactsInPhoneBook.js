const countContactsInPhoneBook = (phoneBook) => {
    const labels = Object.keys(phoneBook);

    return labels.reduce((prevValue, label) => prevValue + phoneBook[label].length, 0);
};

export default countContactsInPhoneBook;
