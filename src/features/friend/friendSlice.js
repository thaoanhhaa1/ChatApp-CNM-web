import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendServices from '~/services/friend.service';

const initialState = {
    friendList: [],
    friendListLoading: false,
    friendReceived: [],
    friendSent: [],
    friendRequestLoading: false,
    hasNewReceived: false,
};

const getFriends = createAsyncThunk('getFriends', async () => {
    const response = await friendServices.getFriends();
    return response.data;
});

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
            state.friendSent.unshift(payload);
        },
        addResponseFriend: (state, { payload }) => {
            state.friendReceived.unshift(payload);
        },
        setNewReceived: (state, { payload }) => {
            state.hasNewReceived = payload;
        },
        acceptFriendSent: (state, { payload }) => {
            const { _id, user } = payload;

            const index = state.friendSent.findIndex((item) => item._id === _id);

            if (index !== -1) state.friendSent.splice(index, 1);
            state.friendList.push(user);
        },
        acceptFriendReceived: (state, { payload }) => {
            const { _id, user } = payload;

            const index = state.friendReceived.findIndex((item) => item._id === _id);

            if (index !== -1) state.friendReceived.splice(index, 1);
            state.friendList.push(user);
        },
        rejectFriendSent: (state, { payload }) => {
            const index = state.friendSent.findIndex((item) => item._id === payload);

            if (index !== -1) state.friendSent.splice(index, 1);
        },
        rejectFriendReceived: (state, { payload }) => {
            const index = state.friendReceived.findIndex((item) => item._id === payload);

            if (index !== -1) state.friendReceived.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFriends.pending, (state) => {
                state.friendListLoading = true;
            })
            .addCase(getFriends.fulfilled, (state, { payload }) => {
                state.friendList = payload?.friends || [];
                state.friendListLoading = false;
            })
            .addCase(getFriends.rejected, (state) => {
                state.friendListLoading = false;
            });
    },
});

export default friendSlice.reducer;
export const {
    setFriendRequest,
    addRequestFriend,
    addResponseFriend,
    setNewReceived,
    acceptFriendReceived,
    acceptFriendSent,
    rejectFriendReceived,
    rejectFriendSent,
} = friendSlice.actions;
export { getFriends };
