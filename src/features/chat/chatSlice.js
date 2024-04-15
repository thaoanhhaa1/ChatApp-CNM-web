import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chat: '',
    files: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat: (state, { payload }) => {
            state.chat = payload;
        },
        setReply: (state, { payload }) => {
            state.reply = payload;
        },
        setFiles: (state, { payload }) => {
            state.files = payload;
        },
        removeFile: (state, { payload }) => {
            state.files = state.files.filter((file) => file.id !== payload);
        },
        addFiles: (state, { payload }) => {
            state.files.push(...payload);
        },
        reset: (state) => ({ ...state, ...initialState }),
    },
});

export default chatSlice.reducer;
export const { setChat, setReply, setFiles, removeFile, addFiles, reset } = chatSlice.actions;
