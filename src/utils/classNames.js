const classNames = (...classNameList) => {
    return classNameList.filter((className) => className && typeof className === 'string').join(' ');
};

export default classNames;
