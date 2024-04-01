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
        },
        updateLastMessage: (state, { payload }) => {
            const { conversationId, message } = payload;

            const chat = state.chats.find((chat) => chat._id === conversationId);
            chat.lastMessage = message;
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
export const { setTyping, setActive, updateLastMessage } = chatsSlice.actions;
export { getChats, getConversation };
