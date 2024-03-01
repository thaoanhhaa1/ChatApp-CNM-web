import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [
        {
            avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:00:00',
            id: 0,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
            name: 'Jane Smith',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:05:00',
            id: 1,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:10:00',
            id: 2,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'Jane Smith',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:15:00',
            id: 3,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:20:00',
            id: 4,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'Jane Smith',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:25:00',
            id: 5,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:30:00',
            id: 6,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'Jane Smith',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2021-01-01 09:35:00',
            id: 7,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'Jane Smith',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2024-01-18 09:35:00',
            files: [{ name: 'Minible-Vertical.zip' }],
            id: 8,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2024-01-18 09:35:00',
            files: [{ name: 'Minible-Vertical.zip' }],
            id: 9,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2024-01-18 09:35:00',
            images: [
                'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
            id: 10,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2024-01-18 09:35:00',
            files: [{ name: 'Minible-Vertical.zip' }],
            id: 11,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'John Doe',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            date: '2024-01-19 09:40:00',
            id: 12,
        },
        {
            avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
            name: 'Jane Smith',
            messages: [
                { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
            ],
            images: [
                'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
            date: '2024-01-20 09:45:00',
            id: 13,
        },
    ],
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
