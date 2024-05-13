const findUserById = (users, _id) => users.find((user) => user._id === _id);

export default findUserById;
