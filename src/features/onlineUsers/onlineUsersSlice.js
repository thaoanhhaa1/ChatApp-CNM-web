import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    offlineRecent: {},
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
        addOfflineRecent: (state, { payload }) => {
            if (state.offlineRecent[payload.userId]) clearTimeout(state.offlineRecent[payload.userId]);
            state.offlineRecent[payload.userId] = payload.idTimeout;
        },
        removeOfflineRecent: (state, { payload }) => {
            delete state.offlineRecent[payload];
        },
    },
});

export default onlineUsersSlice.reducer;
export const { addOnlineUser, addOnlineUsers, removeOnlineUser, addOfflineRecent, removeOfflineRecent } =
    onlineUsersSlice.actions;
