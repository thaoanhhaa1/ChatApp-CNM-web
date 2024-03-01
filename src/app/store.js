import { configureStore } from '@reduxjs/toolkit';
import attachFilesReducer from '~/features/attachFiles/attachFilesSlice';
import chatsReducer from '~/features/chats/chatsSlice';
import messagesReducer from '~/features/messages/messagesSlice';
import onlineUsersReducer from '~/features/onlineUsers/onlineUsersSlice';
import userReducer from '~/features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        attachFiles: attachFilesReducer,
        messages: messagesReducer,
        chats: chatsReducer,
        onlineUsers: onlineUsersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
