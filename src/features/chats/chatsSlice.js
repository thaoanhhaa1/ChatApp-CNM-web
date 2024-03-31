import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllConversations } from '~/services';

const initialState = {
    chats: [],
    loading: false,
    active: null
};

const getChats = createAsyncThunk('getChats', async () => {
    const response = await getAllConversations();

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
            });
    },
});

export default chatsSlice.reducer;
export const { setTyping, setActive } = chatsSlice.actions;
export { getChats };
