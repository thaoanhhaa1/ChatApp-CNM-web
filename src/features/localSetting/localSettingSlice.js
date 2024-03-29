import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settings: {
        theme: 'light',
        loginAt: '',
    },
};

const localSettingSlice = createSlice({
    name: 'localSetting',
    initialState,
    reducers: {
        setSetting: (state, { payload }) => {
            Object.assign(state.settings, payload);
        },
        reset: (state) => {
            state.settings = initialState.settings;
        },
    },
});

export const { setSetting, reset } = localSettingSlice.actions;
export default localSettingSlice.reducer;
