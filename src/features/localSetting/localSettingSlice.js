import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settings: {
        theme: 'light',
        loginAt: '',
        recentSearch: [],
        ignoreSuggestFriends: [],
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
        addRecentSearch: (state, { payload }) => {
            const recentSearch = state.settings.recentSearch;

            const index = recentSearch.findIndex((user) => user._id === payload._id);
            if (index !== -1) {
                recentSearch.splice(index, 1);
            } else if (recentSearch.length >= 10) recentSearch.pop();

            recentSearch.unshift(payload);
        },
        removeRecentSearch: (state, { payload }) => {
            const recentSearch = state.settings.recentSearch;

            state.settings.recentSearch = recentSearch.filter((user) => user._id !== payload);
        },
        addIgnoreSuggestFriends: (state, { payload }) => {
            state.settings.ignoreSuggestFriends.push(payload);
        },
    },
});

export const { setSetting, reset, addRecentSearch, removeRecentSearch, addIgnoreSuggestFriends } =
    localSettingSlice.actions;
export default localSettingSlice.reducer;
