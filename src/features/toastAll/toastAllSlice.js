import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locationError: false,
    toast: '',
};

const toastAllSlice = createSlice({
    name: 'toastAll',
    initialState,
    reducers: {
        setLocationError: (state, { payload }) => {
            state.locationError = payload;
        },
        setToast: (state, { payload }) => {
            state.toast = payload;
        },
    },
});

export const { setLocationError, setToast } = toastAllSlice.actions;
export default toastAllSlice.reducer;
