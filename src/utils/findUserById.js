import getAgoraUid from './getAgoraUid';

const findUserById = (users, _id) => users.find((user) => getAgoraUid(user._id) === _id);

export default findUserById;
