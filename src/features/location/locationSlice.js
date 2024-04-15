import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    location: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, { payload }) => {
            state.location = payload;
        },
        reset: (state) => ({ ...state, ...initialState }),
    },
});

export const { setLocation, reset } = locationSlice.actions;
export default locationSlice.reducer;
