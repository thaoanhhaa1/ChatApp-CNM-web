import { groupRole } from '~/constants';

const addRoleToUser = (user, admin, deputy) => {
    const newUser = { ...user };

    if (user._id === admin) newUser.role = groupRole.OWNER_ROLE;
    else if (deputy.includes(user._id)) newUser.role = groupRole.ADMIN_ROLE;
    else newUser.role = groupRole.MEMBER_ROLE;

    return newUser;
};

export default addRoleToUser;
