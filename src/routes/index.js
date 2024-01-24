import config from '~/config';
import { Chats, Contacts } from '~/pages';

const routes = [
    {
        path: config.routes.chats,
        component: Chats,
    },
    {
        path: config.routes.contacts,
        component: Contacts,
    },
];

export default routes;
