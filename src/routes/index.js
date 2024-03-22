import config from '~/config';
import { Chats, Contacts, Profile, Register, NotFound } from '~/pages';

const routes = [
    {
        path: config.routes.chats,
        component: Chats,
    },
    {
        path: config.routes.contacts,
        component: Contacts,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.register,
        component: Register,
        layout: null,
    },
    {
        path: config.routes[404],
        component: NotFound,
        layout: null,
    },
];

export default routes;
