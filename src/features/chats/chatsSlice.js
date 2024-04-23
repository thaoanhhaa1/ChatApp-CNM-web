import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import conversationServices from '~/services/conversation.service';

const initialState = {
    chats: [],
    loading: false,
    active: null,
    activeLoading: false,
    firstFetch: false,
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
            if (chat) chat.unreadMessageCount = 0;
        },
        updateMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (!chat?.messages?.length) return state;

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
            console.log('🚀 ~ chats ~ addMessages');

            if (!payload?.length) return state;

            const conversationId = payload[0].conversationId || payload[0].conversation._id;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) {
                if (chat.messages?.length) {
                } else chat.messages = payload;

                chat.firstFetchMessages = true;

                if (state.active?._id === conversationId) state.active.messages = chat.messages;
            }
        },
        addMessageHead: (state, { payload }) => {
            console.log('🚀 ~ chats ~ addMessageHead');
            console.log('🚀 ~ payload:', payload);
            const conversationId = payload.conversationId || payload.conversation._id;

            const chatIndex = state.chats.findIndex((chat) => chat._id === conversationId);
            const chat = state.chats[chatIndex];

            if (chat && chat?.messages?.[0]?._id !== payload._id) {
                if (chat.messages?.length) chat.messages = [payload, ...chat.messages];
                else chat.messages = [payload];

                chat.lastMessage = payload;
                // FIXME
                chat.unreadMessageCount = chat.unreadMessageCount ? chat.unreadMessageCount + 1 : 1;
                if (state.active?._id === conversationId) {
                    state.active.lastMessage = payload;
                    state.active.messages = chat.messages;
                    chat.unreadMessageCount = 0;
                }

                state.chats.splice(chatIndex, 1);

                if (!chat.pinBy.includes(payload.myId)) {
                    const index = state.chats.findIndex((item) => !item.pinBy.includes(payload.myId));

                    if (index >= 0) state.chats.splice(index, 0, chat);
                    else state.chats.unshift(chat);
                }
            }
        },
        addMessageHeadSocket: (state, { payload }) => {
            console.log('🚀 ~ chats ~ addMessageHeadSocket');
            console.log('🚀 ~ payload:', payload);
            const conversationId = payload.conversationId || payload.conversation._id;

            const chatIndex = state.chats.findIndex((chat) => chat._id === conversationId);
            const chat = state.chats[chatIndex];

            if (chat && chat?.messages?.[0]._id !== payload._id) {
                if (chat.messages?.length) chat.messages = [payload, ...chat.messages];
                else chat.messages = [payload];

                chat.lastMessage = payload;
                if (state.active?._id === conversationId) {
                    state.active.lastMessage = payload;
                    state.active.messages = chat.messages;
                }

                state.chats.splice(chatIndex, 1);

                if (!chat.pinBy.includes(payload.myId)) {
                    const index = state.chats.findIndex((item) => !item.pinBy.includes(payload.myId));

                    if (index >= 0) state.chats.splice(index, 0, chat);
                }
            }
        },
        addChat: (state, { payload }) => {
            console.log('🚀 ~ chats ~ addChat');
            const index = state.chats.findIndex((chat) => chat._id === payload._id);

            if (index < 0) state.chats.unshift(payload);
            else state.chats[index] = payload;
        },
        addChatAndActive: (state, { payload }) => {
            console.log('🚀 ~ chats ~ addChatAndActive');
            const index = state.chats.findIndex((chat) => chat._id === payload._id);

            if (index < 0) state.chats.unshift(payload);
            else state.chats[index] = payload;

            state.active = payload;
        },
        setMessages: (state, { payload }) => {
            console.log('🚀 ~ chats ~ setMessages');
            if (!payload?.length) return state;

            const conversationId = payload[0].conversationId || payload[0].conversation._id;

            const chat = state.chats.find((chat) => chat._id === conversationId);
            chat.messages = payload;

            if (state.active?._id === conversationId) state.active.messages = chat.messages;
        },
        updateMessageReact: (state, { payload }) => {
            const { conversationId, messageId, userId, react } = payload;
            console.log('🚀 ~ messageId:', messageId);
            console.log('🚀 ~ conversationId:', conversationId);

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (chat) {
                const message = (chat?.messages || []).find((message) => {
                    return message._id === messageId;
                });
                console.log('🚀 ~ message:', message);
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
        reset: (state) => ({ ...state, ...initialState }),
        addChats: (state, { payload }) => {
            console.log('🚀 ~ chats ~ addChats');
            if (!payload?.length) return state;

            payload.forEach((chat) => {
                const index = state.chats.findIndex((item) => item._id === chat._id);

                if (index < 0) state.chats.unshift(chat);
                else state.chats[index] = chat;
            });
        },
        changeLastMessage: (state, { payload }) => {
            const { conversationId, message, prevMessage } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);

            if (!chat) return state;

            if (chat.lastMessage?._id === prevMessage._id) chat.lastMessage = message;
            if (state.active?._id === conversationId) state.active.lastMessage = message;
        },
        deleteChat: (state, { payload }) => {
            const chat = state.chats.find((chat) => chat._id === payload);

            if (chat) {
                chat.messages = [];
                chat.lastMessage = null;
            }
            if (chat.active?._id === payload) chat.active = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getChats.fulfilled, (state, { payload }) => {
                state.chats = payload;
                state.firstFetch = true;
                state.loading = false;
            })
            .addCase(getChats.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getConversation.pending, (state) => {
                state.activeLoading = true;
            })
            .addCase(getConversation.fulfilled, (state, { payload }) => {
                console.log('🚀 ~ .addCase ~ payload:', payload);
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
    reset,
    addChats,
    changeLastMessage,
    deleteChat,
} = chatsSlice.actions;
export { getChats, getConversation };
