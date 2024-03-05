import { configureStore } from '@reduxjs/toolkit';
import addContactReducer from '~/features/addContact/addContactSlice';
import contactGroupsReducer from '~/features/contactGroups/contactGroupsSlice';
import contactsReducer from '~/features/contacts/contactsSlice';
import popupMultiLevelReducer from '~/features/popupMultiLevel/popupMultiLevelSlice';
import receivedFriendRequestsReducer from '~/features/receivedFriendRequests/receivedFriendRequestsSlice';
import sentFriendRequestsReducer from '~/features/sentFriendRequests/sentFriendRequestsSlice';
import userReducer from '~/features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        popupMultiLevel: popupMultiLevelReducer,
        addContact: addContactReducer,
        contacts: contactsReducer,
        contactGroups: contactGroupsReducer,
        receivedFriendRequests: receivedFriendRequestsReducer,
        sentFriendRequests: sentFriendRequestsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
