import { configureStore } from '@reduxjs/toolkit';
import addContactReducer from '~/features/addContact/addContactSlice';
import popupMultiLevelReducer from '~/features/popupMultiLevel/popupMultiLevelSlice';
import userReducer from '~/features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        popupMultiLevel: popupMultiLevelReducer,
        addContact: addContactReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
