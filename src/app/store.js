import { configureStore } from '@reduxjs/toolkit';
import addContactReducer from '~/features/addContact/addContactSlice';
import attachedFilesReducer from '~/features/attachedFiles/attachedFilesSlice';
import chatReducer from '~/features/chat/chatSlice';
import chatsReducer from '~/features/chats/chatsSlice';
import contactGroupsReducer from '~/features/contactGroups/contactGroupsSlice';
import createGroupReducer from '~/features/createGroup/createGroupSlice';
import friendReducer from '~/features/friend/friendSlice';
import localSettingReducer from '~/features/localSetting/localSettingSlice';
import locationReducer from '~/features/location/locationSlice';
import messagesReducer from '~/features/messages/messagesSlice';
import onlineUsersReducer from '~/features/onlineUsers/onlineUsersSlice';
import phoneBookReducer from '~/features/phoneBook/phoneBookSlice';
import popupMultiLevelReducer from '~/features/popupMultiLevel/popupMultiLevelSlice';
import searchReducer from '~/features/search/searchSlice';
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
        contactGroups: contactGroupsReducer,
        phoneBook: phoneBookReducer,
        createGroup: createGroupReducer,
        socket: socketReducer,
        localSetting: localSettingReducer,
        search: searchReducer,
        location: locationReducer,
        toastAll: toastAllReducer,
        friend: friendReducer,
        attachedFiles: attachedFilesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
