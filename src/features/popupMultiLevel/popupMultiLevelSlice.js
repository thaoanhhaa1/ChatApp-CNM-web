import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subs: [],
    height: 0,
    updateHeightPopup: () => {},
};

const popupMultiLevelSlice = createSlice({
    name: 'popupMultiLevel',
    initialState,
    reducers: {
        addSub: (state, { payload }) => {
            state.subs.push(payload);
        },
        resetSubs: (state) => {
            state.subs = [];
        },
        popSub: (state) => {
            state.subs.pop();
        },
        setHeight: (state, { payload }) => {
            state.height = payload;
        },
        setUpdateHeightPopup: (state, { payload }) => {
            state.updateHeightPopup = payload;
        },
    },
});

export default popupMultiLevelSlice.reducer;
export const { addSub, resetSubs, popSub, setHeight, setUpdateHeightPopup } = popupMultiLevelSlice.actions;
