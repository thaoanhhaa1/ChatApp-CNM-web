import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: {},
};

const createGroupSlice = createSlice({
    name: 'createGroup',
    initialState,
    reducers: {
        setUrlAvatar: (state, { payload }) => {
            state.avatar.url = payload;
            state.avatar.file = undefined;
        },
        setFileAvatar: (state, { payload }) => {
            state.avatar.file = payload;
            state.avatar.url = undefined;
        },
        setTempFileAvatar: (state, { payload }) => {
            state.avatar.tempFile = payload;
        },
        resetAvatar: (state) => {
            state.avatar = {};
        },
    },
});

export default createGroupSlice.reducer;
export const { setUrlAvatar, setFileAvatar, setTempFileAvatar, resetAvatar } = createGroupSlice.actions;
