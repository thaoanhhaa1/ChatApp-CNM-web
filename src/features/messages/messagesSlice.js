import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sentMessageStatus } from '~/constants';
import {
    getMessages as getMessagesService,
    getReplyMessages as getReplyMessagesService,
    addMessage as sendMessageService,
} from '~/services';

const initialState = {
    messages: [],
    loading: false,
    page: 1,
    maxPage: 1,
};

const getMessages = createAsyncThunk('getMessages', async ({ conversationId, page = 1, size = 20 }) => {
    const response = await getMessagesService(conversationId, page, size);

    return {
        data: response.data,
        page,
    };
});

const sendMessage = createAsyncThunk('sendMessage', async (data) => {
    const { timeSend, ...rest } = data;

    const response = await sendMessageService(rest);

    return { data: response.data, timeSend };
});

const getReplyMessages = createAsyncThunk('getReplyMessages', async (messageId) => {
    const response = await getReplyMessagesService(messageId);

    return response.data;
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setOffsetTop: (state, { payload }) => {
            state.messages.find((message) => {
                if (message._id === payload._id) message.offsetTop = payload.offsetTop;

                return message._id === payload._id;
            });
        },
        setMessages: (state, { payload }) => {
            state.messages = payload;
        },
        addMessage: (state, { payload }) => {
            const message = { ...payload, _id: Date.now() };

            message.state = sentMessageStatus.SENDING;

            state.messages.unshift(message);
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

        builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
            const { timeSend, data } = payload;

            state.loading = false;
            state.messages.find((message) => {
                if (message.timeSend === timeSend) {
                    data.state = sentMessageStatus.SENT;
                    message = data;
                }

                return false;
            });
        });

        builder.addCase(getReplyMessages.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getReplyMessages.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getReplyMessages.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.messages = payload;
        });
    },
});

export default messagesSlice.reducer;
export const { setOffsetTop, setMessages, addMessage } = messagesSlice.actions;
export { getMessages, getReplyMessages, sendMessage };
