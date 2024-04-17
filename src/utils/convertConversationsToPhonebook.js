import getNameConversation from './getNameConversation';

const convertConversationsToPhonebook = (conversations, userId) => {
    const map = new Map();

    conversations.forEach((conversation) => map.set(conversation._id, getNameConversation(conversation, userId)));

    const conversationsSort = [...conversations].sort((firstContact, secondContact) =>
        map.get(firstContact._id).localeCompare(map.get(secondContact._id)),
    );

    const phoneBook = {};

    conversationsSort.forEach((conversation) => {
        const name = map.get(conversation._id);

        if (phoneBook[name]) phoneBook[name].push(conversation);
        else phoneBook[name] = [conversation];
    });

    return phoneBook;
};

export default convertConversationsToPhonebook;
