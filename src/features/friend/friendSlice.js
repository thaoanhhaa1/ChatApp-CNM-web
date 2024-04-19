import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendServices from '~/services/friend.service';

const initialState = {
    friendList: [],
    friendListLoading: false,
    friendListFirstFetch: false,
    friendReceived: [],
    friendSent: [],
    friendRequestLoading: false,
    friendRequestFirstFetch: false,
    hasNewReceived: false,
    suggestFriends: [],
    loadingSuggestFriends: false,
    suggestFriendsFirstFetch: false,
};

const getFriends = createAsyncThunk('getFriends', async () => {
    console.log('🚀 ~ getFriends ~ getFriends', Date.now());
    const response = await friendServices.getFriends();
    console.log('🚀 ~ getFriends ~ getFriends', Date.now());
    return response.data;
});

const getSuggestFriends = createAsyncThunk('suggestFriends', async () => {
    const response = await friendServices.suggestFriends();
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
            console.log('🚀 ~ friend ~ addRequestFriend');
            state.friendSent.unshift(payload);
        },
        addResponseFriend: (state, { payload }) => {
            console.log('🚀 ~ friend ~ addResponseFriend');

            const index = state.friendReceived.findIndex((item) => item._id === payload._id);

            if (index === -1) state.friendReceived.unshift(payload);
        },
        setNewReceived: (state, { payload }) => {
            state.hasNewReceived = payload;
        },
        acceptFriendSent: (state, { payload }) => {
            console.log('🚀 ~ friend ~ acceptFriendSent');
            const { _id, user } = payload;

            const index = state.friendSent.findIndex((item) => item._id === _id);
            if (index !== -1) state.friendSent.splice(index, 1);

            const userIndex = state.friendList.findIndex((item) => item._id === user._id);
            if (userIndex === -1) state.friendList.push(user);
        },
        acceptFriendReceived: (state, { payload }) => {
            console.log('🚀 ~ friend ~ acceptFriendReceived');
            const { _id, user } = payload;

            const index = state.friendReceived.findIndex((item) => item._id === _id);
            if (index !== -1) state.friendReceived.splice(index, 1);

            const userIndex = state.friendList.findIndex((item) => item._id === user._id);
            if (userIndex === -1) state.friendList.push(user);
        },
        rejectFriendSent: (state, { payload }) => {
            const index = state.friendSent.findIndex((item) => item._id === payload);

            if (index !== -1) state.friendSent.splice(index, 1);
        },
        rejectFriendReceived: (state, { payload }) => {
            const index = state.friendReceived.findIndex((item) => item._id === payload);

            if (index !== -1) state.friendReceived.splice(index, 1);
        },
        updateRequestFriendSent: (state, { payload }) => {
            const { _id, newRequest } = payload;

            const index = state.friendSent.findIndex((item) => item._id === _id);

            if (index !== -1) state.friendSent[index] = newRequest;
        },
        removeFriend: (state, { payload }) => {
            const { _id } = payload;
            const index = state.friendList.findIndex((item) => item._id === _id);

            if (index !== -1) state.friendList.splice(index, 1);
        },
        reset: (state) => ({ ...state, ...initialState }),
        addFriend: (state, { payload }) => {
            console.log('🚀 ~ friend ~ addFriend');
            state.friendList.push(payload);
        },
        setFriendRequestFirstFetch: (state) => {
            state.friendRequestFirstFetch = true;
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
                state.friendListFirstFetch = true;
            })
            .addCase(getFriends.rejected, (state) => {
                state.friendListLoading = false;
            })
            .addCase(getSuggestFriends.pending, (state) => {
                state.loadingSuggestFriends = true;
            })
            .addCase(getSuggestFriends.fulfilled, (state, { payload }) => {
                state.suggestFriends = payload;
                state.loadingSuggestFriends = false;
                state.suggestFriendsFirstFetch = true;
            })
            .addCase(getSuggestFriends.rejected, (state) => {
                state.loadingSuggestFriends = false;
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
    updateRequestFriendSent,
    removeFriend,
    reset,
    addFriend,
    setFriendRequestFirstFetch,
} = friendSlice.actions;
export { getFriends, getSuggestFriends };
