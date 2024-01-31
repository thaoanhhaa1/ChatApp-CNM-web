import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
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
