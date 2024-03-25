const compareName = (firstName, secondName) => {
    const firstNameArr = firstName.split(' ');
    const lastNameArr = secondName.split(' ');

    let firstEndWord = firstNameArr.pop();
    let secondEndWord = lastNameArr.pop();

    while (firstEndWord && secondEndWord && firstEndWord === secondEndWord) {
        firstEndWord = firstNameArr.pop();
        secondEndWord = lastNameArr.pop();
    }

    if (firstEndWord) return -1;
    if (secondEndWord) return 1;

    return firstName.localeCompare(secondName);
};

export default compareName;
