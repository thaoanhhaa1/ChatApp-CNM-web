import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state = { ...payload };
        },
        remove: (state) => {
            state = {};
        },
    },
});

export default userSlice.reducer;
export const { remove, setUser } = userSlice.actions;
