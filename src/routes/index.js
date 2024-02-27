import config from '~/config';
import { Chats, Contacts, Register, SignIn } from '~/pages';

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
        path: config.routes.register,
        component: Register,
        layout: null,
    },
    {
        path: config.routes.signIn,
        component: SignIn,
        layout: null,
    },
];

export default routes;
