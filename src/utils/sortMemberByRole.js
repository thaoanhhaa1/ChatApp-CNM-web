const sortMemberByRole = (members, admin, deputy) => {
    const sortedMembers = [...members].sort((a, b) => {
        if (a._id === admin) return -1;
        if (b._id === admin) return 1;
        if (deputy.includes(a._id)) return -1;
        if (deputy.includes(b._id) === deputy) return 1;
        return a.name.localeCompare(b.name);
    });

    return sortedMembers;
};

export default sortMemberByRole;
