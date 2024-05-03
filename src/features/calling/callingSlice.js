import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    users: '',
    type: '',
    sender: '',
    acceptUserIds: [],
    showAudioCalling: false,
    showVideoCalling: false,
};

const callingSlice = createSlice({
    name: 'calling',
    initialState,
    reducers: {
        setCalling: (state, { payload }) => {
            if (state._id) return state;

            const { _id, users, type, sender } = payload;

            state._id = _id;
            state.users = users;
            state.type = type;
            state.sender = sender;
        },
        resetCalling: () => initialState,
        cancelCall: (state, { payload }) => {
            if (state._id !== payload) return state;

            return initialState;
        },
        acceptCall: (state, { payload }) => {
            if (!state._id) return state;

            const { _id, receiver } = payload;

            if (_id === state._id && !state.acceptUserIds.includes(receiver._id)) {
                state.acceptUserIds.push(receiver._id);
            }
        },
        setShowAudioCalling: (state) => {
            state.showAudioCalling = true;
        },
        setHideAudioCalling: (state) => {
            state.showAudioCalling = false;
        },
        setShowVideoCalling: (state) => {
            state.showVideoCalling = true;
        },
        setHideVideoCalling: (state) => {
            state.showVideoCalling = false;
        },
    },
});

export const {
    setCalling,
    resetCalling,
    cancelCall,
    acceptCall,
    setShowAudioCalling,
    setHideAudioCalling,
    setShowVideoCalling,
    setHideVideoCalling,
} = callingSlice.actions;
export default callingSlice.reducer;
