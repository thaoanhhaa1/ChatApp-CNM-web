import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [
        {
            id: '1',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '2',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '3',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '4',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '5',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '6',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
    ],
    loading: false,
};

const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {},
});

export default onlineUsersSlice.reducer;
export const {} = onlineUsersSlice.actions;
