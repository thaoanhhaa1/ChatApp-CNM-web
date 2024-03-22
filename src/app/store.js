import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '~/features/chat/chatSlice';
import chatsReducer from '~/features/chats/chatsSlice';
import messagesReducer from '~/features/messages/messagesSlice';
import onlineUsersReducer from '~/features/onlineUsers/onlineUsersSlice';
import addContactReducer from '~/features/addContact/addContactSlice';
import contactGroupsReducer from '~/features/contactGroups/contactGroupsSlice';
import contactsReducer from '~/features/contacts/contactsSlice';
import contactsGroupReducer from '~/features/contactsGroup/contactsGroupSlice';
import createGroupReducer from '~/features/createGroup/createGroupSlice';
import phoneBookReducer from '~/features/phoneBook/phoneBookSlice';
import popupMultiLevelReducer from '~/features/popupMultiLevel/popupMultiLevelSlice';
import receivedFriendRequestsReducer from '~/features/receivedFriendRequests/receivedFriendRequestsSlice';
import sentFriendRequestsReducer from '~/features/sentFriendRequests/sentFriendRequestsSlice';
import userReducer from '~/features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        messages: messagesReducer,
        chats: chatsReducer,
        onlineUsers: onlineUsersReducer,
        chat: chatReducer,
        popupMultiLevel: popupMultiLevelReducer,
        addContact: addContactReducer,
        contacts: contactsReducer,
        contactGroups: contactGroupsReducer,
        receivedFriendRequests: receivedFriendRequestsReducer,
        sentFriendRequests: sentFriendRequestsReducer,
        phoneBook: phoneBookReducer,
        contactsGroup: contactsGroupReducer,
        createGroup: createGroupReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
