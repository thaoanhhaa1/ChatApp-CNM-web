const api = {
    // Auth
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    logout: () => `/auth/logout`,
    createOTP: () => `/auth/createOTP`,
    verifyOTP: () => `/auth/verifyOTP`,
    sendOTPForgotPassword: () => `/auth/forgotpassword`,
    verifyOTPForgotPassword: () => `/auth/forgot-password`,
    changePassword: () => `/auth/changePassword/`,

    // User
    userInfo: () => `/user/info`,
    searchUsers: (value) => `/user?search=${value}`,
    updateUser: () => `/user`,
    updateAvatar: () => `/user/updateAvatar`,

    // Conversation
    getAllConversations: () => `/conversation`,
    openConversation: () => `/conversation`,
    togglePinConversation: (conversationId) => `/conversation/pin/${conversationId}`,

    // Message
    getMessages: (conversationId) => `/message/${conversationId}`,
    addMessage: () => `/message`,
    getReplyMessages: (params) => `/message/${params[0]}/reply/${params[1]}`,
    deleteMessageForMe: () => `/message/deleteForMe`,
    recallMessage: () => `/message/deleteForAll`,
    pinMessage: (messageId) => `/message/pin/${messageId}`,
    unpinMessage: (messageId) => `/message/unpinMessage/${messageId}`,
    forward: () => `/message/forward`,
    react: () => `/message/react`,

    // Friend
    getFriends: () => `/user/listFriend`,
    addFriend: () => `/user/addfriend`,
    requestFriends: () => `/user/listRequestFriend`,
    responseFriends: () => `/user/listRequestfriendWaitRespone`,
    acceptFriend: () => `/user/acceptfriend`,
    rejectFriend: () => `/user/rejectfriend`,
    revocationRequestFriend: () => `/user/revocationRequestFriend`,
    deleteFriend: (params) => `/user/deletefriend/${params[0]}`,

    // Group
    createGroup: () => `/conversation/group`,
    getGroups: () => `/conversation/group`,
    deleteGroup: (params) => `/conversation/group/${params[0]}`,
    addUsers: (params) => `/conversation/group/${params[0]}/users`,
    removeUser: (params) => `/conversation/group/${params[0]}/users/${params[1]}`,
    leaveGroup: (params) => `/conversation/group/${params[0]}/users/leave`,
    addRole: (params) => `/conversation/group/${params[0]}/users/${params[1]}/role`,
    removeRole: (params) => `/conversation/group/${params[0]}/users/${params[1]}/role`,
};

export default api;
export { default as axiosClient } from './axiosClient';
