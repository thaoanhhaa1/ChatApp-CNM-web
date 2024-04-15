import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendServices from '~/services/friend.service';
import userServices from '~/services/user.service';

const initialState = {
    phone: { country: { name: 'Vietnam', dialling_code: '+84', code: 'VN' }, phone: '' },
    email: '',
    contact: {},
    searchLoading: false,
    addContactLoading: false,
};

const searchUser = createAsyncThunk('searchUser', async ({ search }) => {
    const response = await userServices.searchUsers(search);
    return response.data[0];
});

const addFriend = createAsyncThunk('addFriend', async (data) => {
    const response = await friendServices.addFriend(data);
    return response.data;
});

const addContactSlice = createSlice({
    initialState,
    name: 'addContact',
    reducers: {
        setPhone: (state, { payload }) => {
            if (typeof payload === 'function') state.phone = payload(state.phone);
            else state.phone = payload;
        },
        setPhoneNumber: (state, { payload }) => {
            state.phone.phone = payload;
        },
        setEmail: (state, { payload }) => {
            state.email = payload;
        },
        setContact: (state, { payload }) => {
            state.contact = payload;
        },
        setContactName: (state, { payload }) => {
            state.contact.name = payload;
        },
        reset: (state) => ({ ...state, ...initialState }),
        blockContact: (state) => {
            state.contact.blocked = true;
        },
        unblockContact: (state) => {
            state.contact.blocked = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUser.pending, (state) => {
                state.searchLoading = true;
            })
            .addCase(searchUser.fulfilled, (state, { payload }) => {
                state.contact = payload;
                state.searchLoading = false;
            })
            .addCase(searchUser.rejected, (state) => {
                state.searchLoading = false;
            })
            .addCase(addFriend.pending, (state) => {
                state.addContactLoading = true;
            })
            .addCase(addFriend.fulfilled, (state) => {
                state.addContactLoading = false;
            })
            .addCase(addFriend.rejected, (state) => {
                state.addContactLoading = false;
            });
    },
});

export default addContactSlice.reducer;
export const { setPhone, setEmail, setPhoneNumber, setContact, setContactName, reset, blockContact, unblockContact } =
    addContactSlice.actions;
export { addFriend, searchUser };
