import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { DeleteMessageStatus, sentMessageStatus } from '~/constants';
import messageServices from '~/services/message.service';

const initialState = {
    messages: [],
    loading: false,
    page: 0,
    maxPage: 1,
};

const getMessages = createAsyncThunk('getMessages', async ({ param, query, signal }) => {
    const response = await messageServices.getMessages({ param, query, signal });

    return response.data;
});

const sendMessage = createAsyncThunk('sendMessage', async (data) => {
    const response = await messageServices.addMessage(data);

    return { data: response.data, timeSend: data.timeSend || data.get('timeSend') };
});

const getReplyMessages = createAsyncThunk('getReplyMessages', async (messageId) => {
    const response = await messageServices.getReplyMessages(messageId);

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
            state.page = 0;
            state.maxPage = 1;
        },
        addMessage: (state, { payload }) => {
            const message = { ...payload, _id: v4() };

            message.state = sentMessageStatus.SENDING;
            message.statuses = [];

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
                payload._id !== state.messages?.[0]?._id &&
                payload.conversation._id === state.messages?.[0]?.conversation?._id
            )
                state.messages.unshift(payload);
        },
        updateReact: (state, { payload }) => {
            const { _id, userId, react } = payload;

            const message = state.messages.find((message) => message._id === _id);

            if (!message) return state;

            const status = message.statuses.find((item) => item.user === userId);

            if (!status) message.statuses.push({ user: userId, react });
            else status.react = react;
        },
        reset: (state) => ({ ...state, ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.loading = true;
                // state.messages = [];
            })
            .addCase(getMessages.fulfilled, (state, { payload }) => {
                if (payload.length === 0) state.maxPage = state.page;

                if (payload.at(-1)?._id !== state.messages.at(-1)?._id) {
                    if (state.messages) state.messages.push(...payload);
                    else state.messages = payload;
                    state.page += 1;

                    if (payload.length < 20) state.maxPage = state.page;
                    else state.maxPage += 1;
                }
                state.loading = false;
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
                    if (index >= 0) {
                        state.messages.splice(index, 1);
                        state.messages.unshift(message);
                    }
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
export const { reset, setOffsetTop, setMessages, addMessage, updateDeletedMessage, addMessageSocket, updateReact } =
    messagesSlice.actions;
export { getMessages, getReplyMessages, sendMessage };
