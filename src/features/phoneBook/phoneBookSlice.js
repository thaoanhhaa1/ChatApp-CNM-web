import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import phonebookService from '~/services/phonebook.service';
import { convertContactsToPhoneBook } from '~/utils';

const initialState = {
    phoneBook: {},
    lastUpdated: null,
    loading: false,
};

const getPhoneBook = createAsyncThunk('getPhoneBook', async () => {
    const res = await phonebookService.getPhonebook();

    return res.data;
});

const phoneBookSlice = createSlice({
    name: 'phoneBook',
    initialState,
    reducers: {
        updateContact: (state, { payload }) => {
            const firstCharOfName = (payload.alias || payload.name)[0].toUpperCase();
            const contacts = state.phoneBook[firstCharOfName];
            const index = contacts.findIndex((contact) => contact.id === payload.id);

            contacts[index] = payload;
        },
        recall: (state, { payload }) => {
            const firstCharOfName = (payload.alias || payload.name)[0].toUpperCase();
            const contacts = state.phoneBook[firstCharOfName];
            const index = contacts.findIndex((contact) => contact.id === payload.id);

            contacts[index].isSentRequest = false;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPhoneBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPhoneBook.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getPhoneBook.fulfilled, (state, { payload }) => {
                const { contacts, updatedAt } = payload;

                state.loading = false;
                state.lastUpdated = updatedAt;
                state.phoneBook = convertContactsToPhoneBook(contacts);
            });
    },
});

export default phoneBookSlice.reducer;
export const { updateContact, recall } = phoneBookSlice.actions;
export { getPhoneBook };
