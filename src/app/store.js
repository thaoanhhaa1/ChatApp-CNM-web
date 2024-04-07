import { configureStore } from '@reduxjs/toolkit';
import addContactReducer from '~/features/addContact/addContactSlice';
import chatReducer from '~/features/chat/chatSlice';
import chatsReducer from '~/features/chats/chatsSlice';
import contactGroupsReducer from '~/features/contactGroups/contactGroupsSlice';
import contactsReducer from '~/features/contacts/contactsSlice';
import contactsGroupReducer from '~/features/contactsGroup/contactsGroupSlice';
import createGroupReducer from '~/features/createGroup/createGroupSlice';
import localSettingReducer from '~/features/localSetting/localSettingSlice';
import locationReducer from '~/features/location/locationSlice';
import messagesReducer from '~/features/messages/messagesSlice';
import onlineUsersReducer from '~/features/onlineUsers/onlineUsersSlice';
import phoneBookReducer from '~/features/phoneBook/phoneBookSlice';
import popupMultiLevelReducer from '~/features/popupMultiLevel/popupMultiLevelSlice';
import receivedFriendRequestsReducer from '~/features/receivedFriendRequests/receivedFriendRequestsSlice';
import searchReducer from '~/features/search/searchSlice';
import sentFriendRequestsReducer from '~/features/sentFriendRequests/sentFriendRequestsSlice';
import socketReducer from '~/features/socket/socketSlice';
import toastAllReducer from '~/features/toastAll/toastAllSlice';
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
        socket: socketReducer,
        localSetting: localSettingReducer,
        search: searchReducer,
        location: locationReducer,
        toastAll: toastAllReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
