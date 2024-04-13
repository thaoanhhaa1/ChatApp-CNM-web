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

    // Conversation
    getAllConversations: () => `/conversation`,
    openConversation: () => `/conversation`,
    togglePinConversation: (conversationId) => `/conversation/pin/${conversationId}`,

    // Message
    getMessages: (conversationId) => `/message/${conversationId}`,
    addMessage: () => `/message`,
    getReplyMessages: (messageId) => `/message/reply/${messageId}`,
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
    deleteFriend: () => `/user/deletefriend`,

    // Group
    createGroup: () => `/conversation/group`,
    getGroups: () => `/conversation/group`,
    deleteGroup: (params) => `/conversation/group/${params[0]}`,
    addUsers: (params) => `/conversation/group/${params[0]}/users`,
    removeUser: (params) => `/conversation/group/${params[0]}/users/${params[1]}`,
};

export default api;
export { default as axiosClient } from './axiosClient';
