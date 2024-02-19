import { configureStore } from '@reduxjs/toolkit';
import attachFilesReducer from '~/features/attachFiles/attachFilesSlice';
import userReducer from '~/features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        attachFiles: attachFilesReducer,
    },
});
