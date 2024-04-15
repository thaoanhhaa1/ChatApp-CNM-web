import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userServices from '~/services/user.service';

const initialState = {
    user: {},
    loading: false,
};

const getUserInfo = createAsyncThunk('getUserInfo', async () => {
    const res = await userServices.getUserInfo();

    return res.data;
});

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
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
            });
    },
});

export default userSlice.reducer;
export const { remove, setUser } = userSlice.actions;
export { getUserInfo };
