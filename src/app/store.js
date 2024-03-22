import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '~/features/chat/chatSlice';
import chatsReducer from '~/features/chats/chatsSlice';
import messagesReducer from '~/features/messages/messagesSlice';
import onlineUsersReducer from '~/features/onlineUsers/onlineUsersSlice';
import userReducer from '~/features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        messages: messagesReducer,
        chats: chatsReducer,
        onlineUsers: onlineUsersReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
