import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locationError: false,
};

const toastAllSlice = createSlice({
    name: 'toastAll',
    initialState,
    reducers: {
        setLocationError: (state, { payload }) => {
            state.locationError = payload;
        },
    },
});

export const { setLocationError } = toastAllSlice.actions;
export default toastAllSlice.reducer;
