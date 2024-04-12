import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupServices from '~/services/group.service';

const initialState = {
    avatar: {},
    selectedContacts: [],
    name: '',
    searchUser: '',
    loading: false,
};

const createGroup = createAsyncThunk('createGroup', async (data) => {
    const { avatar, name, selectedContacts } = data;

    const formData = new FormData();

    if (avatar.file) formData.append('avatar', avatar.file);
    else if (avatar.url) formData.append('avatar', avatar.url);
    formData.append('name', name);
    formData.append('users', selectedContacts);

    const res = await groupServices.createGroup({
        data: formData,
    });

    return res.data;
});

const createGroupSlice = createSlice({
    name: 'createGroup',
    initialState,
    reducers: {
        setUrlAvatar: (state, { payload }) => {
            state.avatar.url = payload;
            state.avatar.file = undefined;
        },
        setFileAvatar: (state, { payload }) => {
            state.avatar.file = payload;
            state.avatar.url = undefined;
        },
        setTempFileAvatar: (state, { payload }) => {
            state.avatar.tempFile = payload;
        },
        resetAvatar: (state) => {
            state.avatar = {};
        },
        setSelectedContacts: (state, { payload }) => {
            state.selectedContacts = payload;
        },
        addSelectedContact: (state, { payload }) => {
            state.selectedContacts.push(payload);
        },
        removeSelectedContact: (state, { payload }) => {
            const index = state.selectedContacts.findIndex((item) => item._id === payload._id);

            if (index > -1) state.selectedContacts.splice(index, 1);
        },
        setName: (state, { payload }) => {
            state.name = payload;
        },
        setSearchUser: (state, { payload }) => {
            state.searchUser = payload;
        },
        reset: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
            })
            .addCase(createGroup.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createGroup.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default createGroupSlice.reducer;
export const {
    setUrlAvatar,
    setFileAvatar,
    setTempFileAvatar,
    resetAvatar,
    addSelectedContact,
    removeSelectedContact,
    setName,
    setSearchUser,
    setSelectedContacts,
    reset,
} = createGroupSlice.actions;
export { createGroup };
