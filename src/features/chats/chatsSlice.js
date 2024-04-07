import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllConversations, openConversation } from '~/services';

const initialState = {
    chats: [],
    loading: false,
    active: null,
    activeLoading: false,
};

const getChats = createAsyncThunk('getChats', async () => {
    const response = await getAllConversations();

    return response.data;
});

const getConversation = createAsyncThunk('getConversation', async (receiverId) => {
    const response = await openConversation(receiverId);

    return response.data;
});

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setTyping: (state, { payload }) => {
            state.chats.find((chat) => {
                const find = chat.id === payload.id;

                if (find) {
                    chat.typing = payload.typing;
                }

                return find;
            });
        },
        setActive: (state, { payload }) => {
            state.active = payload;

            const chat = state.chats.find((chat) => chat._id === payload._id);
            if (chat) chat.unseenMessages = 0;
        },
        updateLastMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) chat.lastMessage = message;
            if (state.active?._id === conversationId) state.lastMessage = message;
        },
        updateMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat && chat.lastMessage?._id === message._id) chat.lastMessage = message;

            if (state.active?._id === conversationId && state?.lastMessage?._id === message._id)
                state.lastMessage = message;
        },
        togglePin: (state, { payload }) => {
            const { conversationId, userId } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) {
                const index = chat.pinBy.findIndex((item) => item === userId);

                if (index >= 0) chat.pinBy.splice(index, 1);
                else chat.pinBy.push(userId);
            }
        },
        addPinMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat.pinnedMessages.length >= 3) chat.pinnedMessages.shift();

            if (chat) chat.pinnedMessages.unshift(message);
            if (state.active?._id === conversationId) state.active.pinnedMessages.unshift(message);
        },
        addMessages: (state, { payload }) => {
            if (!payload?.length) return state;

            const conversationId = payload[0].conversationId || payload[0].conversation._id;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) {
                if (chat.messages?.length) chat.messages = [...chat.messages, ...payload];
                else chat.messages = payload;
            }
        },
        addMessageHead: (state, { payload }) => {
            const conversationId = payload.conversationId || payload.conversation._id;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat && chat.messages?.[0]._id !== payload._id) {
                console.log(chat.messages?.length);

                if (chat.messages?.length) chat.messages = [payload, ...chat.messages];
                else chat.messages = [payload];

                chat.lastMessage = payload;
                // FIXME
                chat.unseenMessages = chat.unseenMessages ? chat.unseenMessages + 1 : 1;
                if (state.active?._id === conversationId) {
                    state.lastMessage = payload;
                    chat.unseenMessages = 0;
                }
            }
        },
        addChat: (state, { payload }) => {
            const index = state.chats.findIndex((chat) => chat._id === payload._id);

            if (index < 0) state.chats.unshift(payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getChats.fulfilled, (state, { payload }) => {
                state.chats = payload;
                state.loading = false;
            })
            .addCase(getChats.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getConversation.pending, (state) => {
                state.activeLoading = true;
            })
            .addCase(getConversation.fulfilled, (state, { payload }) => {
                state.active = payload;
                state.activeLoading = false;

                const chat = state.chats.find((chat) => chat._id === payload._id);

                if (!chat) state.chats.unshift(payload);
            })
            .addCase(getConversation.rejected, (state) => {
                state.activeLoading = false;
            });
    },
});

export default chatsSlice.reducer;
export const {
    setTyping,
    setActive,
    updateLastMessage,
    updateMessage,
    togglePin,
    addPinMessage,
    addMessages,
    addMessageHead,
    addChat,
} = chatsSlice.actions;
export { getChats, getConversation };
