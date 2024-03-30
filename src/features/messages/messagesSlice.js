import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
};

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
});

export default messagesSlice.reducer;
export const { setOffsetTop, setMessages, addMessages } = messagesSlice.actions;
