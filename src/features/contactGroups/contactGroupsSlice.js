import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupServices from '~/services/group.service';

const initialState = {
    groups: [],
    loading: false,
};

const getGroups = createAsyncThunk('getGroups', async () => {
    const response = await groupServices.getGroups();
    return response.data;
});

const contactGroupsSlice = createSlice({
    name: 'contactGroups',
    initialState,
    reducers: {
        setGroups: (state, { payload }) => {
            state.groups = payload;
        },
        addGroup: (state, { payload }) => {
            state.groups.unshift(payload);
        },
        removeGroup: (state, { payload }) => {
            const index = state.groups.findIndex((group) => group._id === payload);

            if (index !== -1) state.groups.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGroups.fulfilled, (state, { payload }) => {
                state.groups = payload;
                state.loading = false;
            })
            .addCase(getGroups.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default contactGroupsSlice.reducer;
export const { addGroup, setGroups, removeGroup } = contactGroupsSlice.actions;
export { getGroups };
