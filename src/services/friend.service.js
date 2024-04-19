import api, { axiosClient } from '~/api';

const friendServices = {
    getFriends: () => axiosClient.get(api.getFriends()),
    addFriend: (data) => axiosClient.post(api.addFriend(), data),
    requestFriends: () => axiosClient.get(api.requestFriends()),
    responseFriends: () => axiosClient.get(api.responseFriends()),
    acceptFriend: (friendId) => axiosClient.post(api.acceptFriend(), { friendId }),
    rejectFriend: (friendId) => axiosClient.post(api.rejectFriend(), { friendId }),
    revocationRequestFriend: (friendId) => axiosClient.post(api.revocationRequestFriend(), { friendId }),
    deleteFriend: (friendId) => axiosClient.delete(api.deleteFriend([friendId])),
    suggestFriends: () => axiosClient.get(api.suggestFriends()),
};

export default friendServices;
