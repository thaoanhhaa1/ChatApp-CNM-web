import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { axiosClient } from '~/api';

const initialState = {
    messages: [],
    loading: false,
    page: 1,
    maxPage: 1,
};

const getMessages = createAsyncThunk('getMessages', async ({ conversationId, page = 1, size = 20 }) => {
    const response = await axiosClient.get(api.getMessages(conversationId), {
        params: {
            page,
            size,
        },
    });

    return {
        data: response.data,
        page,
    };
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setOffsetTop: (state, { payload }) => {
            state.messages.find((message) => {
                if (message.id === payload.id) message.offsetTop = payload.offsetTop;

                return message.id === payload.id;
            });
        },
        setMessages: (state, { payload }) => {
            state.messages = payload;
        },
        addMessages: (state, { payload }) => {
            state.messages.push(...payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getMessages.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.messages = payload.data;
            state.page = payload.page;
        });

        builder.addCase(getMessages.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default messagesSlice.reducer;
export const { setOffsetTop, setMessages, addMessages } = messagesSlice.actions;
export { getMessages };
