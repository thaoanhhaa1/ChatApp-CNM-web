import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageServices from '~/services/message.service';

const initialState = {};

const getAttachedFiles = createAsyncThunk('attachedFiles', async ({ conversationId }) => {
    const files = await messageServices.getAttachedFiles({
        params: [conversationId],
    });

    return {
        conversationId,
        files: files.data,
    };
});

const attachedFilesSlice = createSlice({
    name: 'attachedFiles',
    initialState,
    reducers: {
        addAttachedFile: (state, { payload }) => {
            const { conversationId, file } = payload;

            if (!state[conversationId]) state[conversationId] = [];

            const index = state[conversationId].findIndex((f) => f.link === file.link);

            if (index === -1) state[conversationId].unshift(file);
        },
        removeAttachedFile: (state, { payload }) => {
            const { conversationId, file } = payload;

            if (!state[conversationId]) return;

            state[conversationId] = state[conversationId].filter((f) => f.link !== file.link);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAttachedFiles.fulfilled, (state, { payload }) => {
            const { conversationId, files } = payload;

            state[conversationId] = files;
        });
    },
});

export default attachedFilesSlice.reducer;
export { getAttachedFiles };
export const { addAttachedFile, removeAttachedFile } = attachedFilesSlice.actions;
