const isContactInclude = (contacts, contact) => contacts.some((item) => item._id === contact._id);

export default isContactInclude;
