const sortGroupByName = (groups) => [...groups].sort((a, b) => a.name.localeCompare(b.name));

export default sortGroupByName;
