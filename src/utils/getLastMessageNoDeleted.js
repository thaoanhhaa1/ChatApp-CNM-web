import { DeleteMessageStatus } from '~/constants';

const getLastMessageNoDeleted = (messages) =>
    (messages || []).find((message) => message.deleted !== DeleteMessageStatus.DELETE_FOR_ME);

export default getLastMessageNoDeleted;
