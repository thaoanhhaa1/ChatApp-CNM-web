import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    users: [],
    type: '',
    sender: '',
    acceptUserIds: [],
    rejectUserIds: [],
    notifiedUserIds: [],
    endedUserIds: [],
    busyUserIds: [],
    missedUserIds: [],
    showCalling: false,
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
            state.acceptUserIds = [sender._id];
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
        setShowCalling: (state) => {
            state.showCalling = true;
        },
        setHideCalling: (state) => {
            state.showCalling = false;
        },
        addRejectUserIds: (state, { payload }) => {
            if (!state._id) return state;

            const { _id, senderId } = payload;

            if (_id === state._id && !state.rejectUserIds.includes(senderId)) state.rejectUserIds.push(senderId);
        },
        addNotifiedUserIds: (state, { payload }) => {
            if (!state._id) return state;

            const { senderId } = payload;

            if (!state.notifiedUserIds.includes(senderId)) state.notifiedUserIds.push(senderId);
        },
        addEndedUserIds: (state, { payload }) => {
            if (!state._id) return state;

            const { senderId, _id } = payload;

            if (state._id === _id && !state.endedUserIds.includes(senderId)) state.endedUserIds.push(senderId);
            state.acceptUserIds = state.acceptUserIds.filter((id) => id !== senderId);
        },
        setNotifiedUserIds: (state, { payload }) => {
            const { _id, notifiedUserIds } = payload;

            if (_id !== state._id) return state;

            state.notifiedUserIds = notifiedUserIds;
        },
        addBusyUserId: (state, { payload }) => {
            if (!state._id) return state;

            const { senderId, _id } = payload;

            if (_id === state._id && !state.busyUserIds.includes(senderId)) state.busyUserIds.push(senderId);
        },
        addMissedUserIds: (state, { payload }) => {
            if (!state._id) return state;

            const { missedUserIds, _id } = payload;

            if (_id === state._id) state.missedUserIds = missedUserIds;
        },
    },
});

export const {
    setCalling,
    resetCalling,
    cancelCall,
    acceptCall,
    setShowCalling,
    setHideCalling,
    addRejectUserIds,
    addNotifiedUserIds,
    addEndedUserIds,
    setNotifiedUserIds,
    addBusyUserId,
    addMissedUserIds,
} = callingSlice.actions;
export default callingSlice.reducer;
