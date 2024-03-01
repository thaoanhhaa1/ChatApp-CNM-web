import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        id: 1,
    },
    loading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
            state.loading = false;
        },
        remove: (state) => {
            state.user = {};
            state.loading = false;
        },
    },
});

export default userSlice.reducer;
export const { remove, setUser } = userSlice.actions;
