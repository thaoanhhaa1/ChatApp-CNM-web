import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { DeleteMessageStatus, sentMessageStatus } from '~/constants';
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

const getMessages = createAsyncThunk('getMessages', async ({ param, query, signal }) => {
    console.log('Get messages....');
    const response = await getMessagesService({ param, query, signal });

    return response.data;
});

const sendMessage = createAsyncThunk('sendMessage', async (data) => {
    const response = await sendMessageService(data);

    return { data: response.data, timeSend: data.timeSend || data.get('timeSend') };
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
            const message = { ...payload, _id: v4() };

            message.state = sentMessageStatus.SENDING;

            state.messages.unshift(message);
        },
        updateDeletedMessage: (state, { payload }) => {
            const { _id, deleted } = payload;

            const message = state.messages.find((message) => message._id === _id);
            if (message) message.deleted = deleted;

            state.messages.forEach((message) => {
                if (message.reply?._id === _id) message.reply.deleted = deleted;
            });
        },
        addMessageSocket: (state, { payload }) => {
            if (
                payload &&
                payload._id !== state.messages?.[0]._id &&
                payload.conversation._id === state.messages[0].conversation._id
            )
                state.messages.unshift(payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.loading = true;
                state.messages = [];
            })
            .addCase(getMessages.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.messages = payload;
            })
            .addCase(getMessages.rejected, (state) => {
                state.loading = false;
            })
            .addCase(sendMessage.fulfilled, (state, { payload }) => {
                const {
                    timeSend,
                    data: { message },
                } = payload;

                state.loading = false;
                const index = state.messages.findIndex((message) => +message.timeSend === +timeSend);
                if (message?._id) {
                    message.state = sentMessageStatus.SENT;
                    if (index >= 0) state.messages.splice(index, 1, message);
                } else if (state.messages[index]) {
                    state.messages[index].deleted = DeleteMessageStatus.DELETE_FOR_ME;
                }
            })
            .addCase(getReplyMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReplyMessages.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getReplyMessages.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.messages = payload;
            });
    },
});

export default messagesSlice.reducer;
export const { setOffsetTop, setMessages, addMessage, updateDeletedMessage, addMessageSocket } = messagesSlice.actions;
export { getMessages, getReplyMessages, sendMessage };
