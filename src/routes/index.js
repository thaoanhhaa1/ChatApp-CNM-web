import config from '~/config';
import { Chats } from '~/pages';

const routes = [
    {
        path: config.routes.chats,
        component: Chats,
    },
];

export default routes;
