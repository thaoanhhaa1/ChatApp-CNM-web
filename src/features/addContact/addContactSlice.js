import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    phone: { country: { name: 'Vietnam', dialling_code: '+84', code: 'VN' }, phone: '' },
    contact: {},
};

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
});

export default addContactSlice.reducer;
export const { setPhone, setPhoneNumber, setContact, setContactName, reset, blockContact, unblockContact } =
    addContactSlice.actions;
