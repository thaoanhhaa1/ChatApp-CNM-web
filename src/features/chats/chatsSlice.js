import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import conversationServices from '~/services/conversation.service';

const initialState = {
    chats: [],
    loading: false,
    active: null,
    activeLoading: false,
};

const getChats = createAsyncThunk('getChats', async () => {
    const response = await conversationServices.getAllConversations();

    return response.data;
});

const getConversation = createAsyncThunk('getConversation', async (receiverId) => {
    const response = await conversationServices.openConversation(receiverId);

    return response.data;
});

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setTyping: (state, { payload }) => {
            const { conversationId, userId, typing } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (!chat) return state;

            const user = chat.users.find((user) => user._id === userId);

            if (user) user.typing = typing;
            if (state.active?._id === conversationId) state.active.users = chat.users;
        },
        setActive: (state, { payload }) => {
            state.active = payload;

            const chat = state.chats.find((chat) => chat._id === payload?._id);
            if (chat) chat.unseenMessages = 0;
        },
        updateMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (!chat.messages?.length) return state;

            chat.messages.forEach((item, index) => {
                if (item._id === message._id) chat.messages[index] = message;

                if (item.reply?._id === message._id) item.reply = message;
            });

            if (state.active?._id === conversationId) {
                state.active.messages = chat.messages;

                if (state?.lastMessage?._id === message._id) state.active.lastMessage = message;
            }
        },
        togglePin: (state, { payload }) => {
            const { conversationId, userId } = payload;

            const chatIndex = state.chats.findIndex((chat) => chat._id === conversationId);

            if (chatIndex >= 0) {
                const chat = state.chats[chatIndex];
                const index = chat.pinBy.findIndex((item) => item === userId);

                if (index >= 0) chat.pinBy.splice(index, 1);
                else {
                    chat.pinBy.push(userId);
                    state.chats.splice(chatIndex, 1);
                    state.chats.unshift(chat);
                }

                if (state.active?._id === conversationId) state.active.pinBy = chat.pinBy;
            }
        },
        addPinMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);
            const index = chat.pinnedMessages.findIndex((item) => item._id === message._id);

            if (index >= 0) chat.pinnedMessages.splice(index, 1);
            else if (chat.pinnedMessages.length >= 3) chat.pinnedMessages.shift();

            if (chat) chat.pinnedMessages.unshift(message);
            if (state.active?._id === conversationId) state.active.pinnedMessages = chat.pinnedMessages;
        },
        removePinMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) {
                const index = chat.pinnedMessages.findIndex((item) => item._id === message._id);

                if (index >= 0) chat.pinnedMessages.splice(index, 1);
                if (state.active?._id === conversationId) state.active.pinnedMessages = chat.pinnedMessages;
            }
        },
        addMessages: (state, { payload }) => {
            if (!payload?.length) return state;

            const conversationId = payload[0].conversationId || payload[0].conversation._id;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) {
                if (chat.messages?.length) chat.messages = [...chat.messages, ...payload];
                else chat.messages = payload;

                if (state.active?._id === conversationId) state.active.messages = chat.messages;
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
                    state.active.lastMessage = payload;
                    state.active.messages = chat.messages;
                    chat.unseenMessages = 0;
                }
            }
        },
        addMessageHeadSocket: (state, { payload }) => {
            const conversationId = payload.conversationId || payload.conversation._id;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat && chat.messages?.[0]._id !== payload._id) {
                console.log(chat.messages?.length);

                if (chat.messages?.length) chat.messages = [payload, ...chat.messages];
                else chat.messages = [payload];

                chat.lastMessage = payload;
                // FIXME
                if (state.active?._id === conversationId) {
                    state.active.lastMessage = payload;
                    state.active.messages = chat.messages;
                }
            }
        },
        addChat: (state, { payload }) => {
            const index = state.chats.findIndex((chat) => chat._id === payload._id);

            if (index < 0) state.chats.unshift(payload);
            else state.chats[index] = payload;
        },
        addChatAndActive: (state, { payload }) => {
            const index = state.chats.findIndex((chat) => chat._id === payload._id);

            if (index < 0) state.chats.unshift(payload);
            else state.chats[index] = payload;

            state.active = payload;
        },
        setMessages: (state, { payload }) => {
            if (!payload?.length) return state;

            const conversationId = payload[0].conversationId || payload[0].conversation._id;

            const chat = state.chats.find((chat) => chat._id === conversationId);
            chat.messages = payload;

            if (state.active?._id === conversationId) state.active.messages = chat.messages;
        },
        updateMessageReact: (state, { payload }) => {
            const { conversationId, messageId, userId, react } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) {
                const message = chat.messages.find((message) => message._id === messageId);

                if (message) {
                    const status = message.statuses.find((item) => item.user === userId);

                    if (status) status.react = react;
                    else message.statuses.push({ user: userId, react });
                }

                if (state.active?._id === conversationId) state.active.messages = chat.messages;
            }
        },
        removeConversation: (state, { payload }) => {
            const index = state.chats.findIndex((chat) => chat._id === payload);

            if (index >= 0) state.chats.splice(index, 1);
            if (state.active?._id === payload) state.active = null;
        },
        addOrUpdateChat: (state, { payload }) => {
            if (!payload?._id) return state;

            const index = state.chats.findIndex((chat) => chat._id === payload._id);

            if (index < 0) state.chats.unshift(payload);
            else state.chats[index] = payload;

            if (state.active?._id === payload._id) state.active = payload;
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
    setMessages,
    setTyping,
    setActive,
    updateMessage,
    togglePin,
    addPinMessage,
    removePinMessage,
    addMessages,
    addMessageHead,
    addChat,
    addMessageHeadSocket,
    updateMessageReact,
    addChatAndActive,
    removeConversation,
    addOrUpdateChat,
} = chatsSlice.actions;
export { getChats, getConversation };
