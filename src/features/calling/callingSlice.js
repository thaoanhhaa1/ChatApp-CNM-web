import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    users: '',
    type: '',
    sender: '',
    acceptUserIds: [],
    rejectUserIds: [],
    notifiedUserIds: [],
    endedUserIds: [],
    roles: {},
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
                state.roles[receiver._id] = {
                    video: true,
                    audio: true,
                };
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
        addRejectUserIds: (state, { payload }) => {
            if (!state._id) return state;

            const { _id, senderId } = payload;

            if (_id === state._id && !state.rejectUserIds.includes(senderId)) {
                state.rejectUserIds.push(senderId);
            }
        },
        addNotifiedUserIds: (state, { payload }) => {
            if (!state._id) return state;

            const { senderId } = payload;

            if (!state.notifiedUserIds.includes(senderId)) {
                state.notifiedUserIds.push(senderId);
            }
        },
        addEndedUserIds: (state, { payload }) => {
            if (!state._id) return state;

            const { senderId } = payload;

            if (!state.endedUserIds.includes(senderId)) {
                state.endedUserIds.push(senderId);
            }
        },
        updateRoles: (state, { payload }) => {
            console.log('🚀 ~ payload:', payload);
            const { userId, video, audio } = payload;

            if (state?.roles)
                state.roles[userId] = {
                    video,
                    audio,
                };
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
    addRejectUserIds,
    addNotifiedUserIds,
    addEndedUserIds,
    updateRoles,
} = callingSlice.actions;
export default callingSlice.reducer;
