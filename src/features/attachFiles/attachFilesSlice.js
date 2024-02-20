import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    files: [],
};

const attachFilesSlice = createSlice({
    name: 'attachFiles',
    initialState,
    reducers: {
        setFiles: (state, { payload }) => {
            state.files = payload;
        },
        removeFile: (state, { payload }) => {
            state.files = state.files.filter((file) => file.id !== payload);
        },
        addFiles: (state, { payload }) => {
            state.files.push(...payload);
        },
    },
});

export default attachFilesSlice.reducer;
export const { setFiles, removeFile, addFiles } = attachFilesSlice.actions;
