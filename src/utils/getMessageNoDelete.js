import { DeleteMessageStatus } from '~/constants';

const getMessageNoDelete = (messages, messageDeleteId) =>
    messages.find(
        (message) => message.deleted !== DeleteMessageStatus.DELETE_FOR_ME && message._id === messageDeleteId,
    );

export default getMessageNoDelete;
