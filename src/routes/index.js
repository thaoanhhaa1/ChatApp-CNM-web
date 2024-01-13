import config from '~/config';
import { Home, Register } from '~/pages';

const routes = [
    {
        path: config.routes.chats,
        component: Home,
    },

    {
        path: config.routes.register,
        component: Register,
        layout: null,
    },
];

export default routes;
