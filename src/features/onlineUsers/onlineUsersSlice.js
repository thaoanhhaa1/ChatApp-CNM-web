import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        addOnlineUser: (state, { payload }) => {
            const index = state.users.findIndex((item) => item === payload);

            if (index === -1) state.users.push(payload);
        },
        addOnlineUsers: (state, { payload }) => {
            state.users = [...new Set([...state.users, ...payload])];
        },
        removeOnlineUser: (state, { payload }) => {
            const index = state.users.findIndex((item) => item === payload);
            if (index !== -1) state.users.splice(index, 1);
        },
    },
});

export default onlineUsersSlice.reducer;
export const { addOnlineUser, addOnlineUsers, removeOnlineUser } = onlineUsersSlice.actions;
