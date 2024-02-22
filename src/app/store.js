import { configureStore } from '@reduxjs/toolkit';
import popupMultiLevelReducer from '~/features/popupMultiLevel/popupMultiLevelSlice';
import userReducer from '~/features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        popupMultiLevel: popupMultiLevelReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
