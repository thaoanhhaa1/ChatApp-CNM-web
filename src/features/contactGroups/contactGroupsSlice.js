import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupServices from '~/services/group.service';

const initialState = {
    groups: [],
    loading: false,
    firstFetch: false,
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
            const index = state.groups.findIndex((group) => group._id === payload._id);

            if (index !== -1) state.groups[index] = payload;
            else state.groups.unshift(payload);
        },
        removeGroup: (state, { payload }) => {
            const index = state.groups.findIndex((group) => group._id === payload);

            if (index !== -1) state.groups.splice(index, 1);
        },
        addOrUpdateGroup: (state, { payload }) => {
            const index = state.groups.findIndex((group) => group._id === payload._id);

            if (index !== -1) state.groups[index] = payload;
            else state.groups.unshift(payload);
        },
        reset: (state) => ({ ...state, ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGroups.fulfilled, (state, { payload }) => {
                state.groups = payload;
                state.loading = false;
                state.firstFetch = true;
            })
            .addCase(getGroups.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default contactGroupsSlice.reducer;
export const { addGroup, setGroups, removeGroup, addOrUpdateGroup, reset } = contactGroupsSlice.actions;
export { getGroups };
