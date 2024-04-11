import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userServices from '~/services/user.service';

const initialState = {
    contacts: [],
    loadingContacts: false,
    messages: [],
    loadingMessages: false,
    files: [],
    loadingFiles: false,
    search: '',
};

const searchUsers = createAsyncThunk('searchUsers', async (search) => {
    const response = await userServices.searchUsers(search);

    return response.data;
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, { payload }) => {
            state.search = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loadingContacts = true;
            })
            .addCase(searchUsers.fulfilled, (state, { payload }) => {
                state.contacts = payload;
                state.loadingContacts = false;
            })
            .addCase(searchUsers.rejected, (state) => {
                state.loadingContacts = false;
            });
    },
});

export const { setSearch } = searchSlice.actions;
export { searchUsers };
export default searchSlice.reducer;
