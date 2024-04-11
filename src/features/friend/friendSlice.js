import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    friendList: [],
    friendReceived: [],
    friendSent: [],
    friendRequestLoading: false,
    hasNewReceived: false,
};

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriendRequest: (state, { payload }) => {
            const { requestFriends, responseFriends } = payload;

            state.friendReceived = responseFriends;
            state.friendSent = requestFriends;
        },
        addRequestFriend: (state, { payload }) => {
            state.friendSent.push(payload);
        },
        addResponseFriend: (state, { payload }) => {
            state.friendReceived.push(payload);
        },
        setNewReceived: (state, { payload }) => {
            state.hasNewReceived = payload;
        },
    },
});

export default friendSlice.reducer;
export const { setFriendRequest, addRequestFriend, addResponseFriend, setNewReceived } = friendSlice.actions;
