import config from '~/config';
import { Home } from '~/pages';

const routes = [
    {
        path: config.routes.chats,
        component: Home,
    },
];

export default routes;
