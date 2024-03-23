import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Item from './Item';

const PhoneBook = ({ phoneBook, render }) => {
    const labels = useMemo(() => Object.keys(phoneBook), [phoneBook]);

    return (
        <div>
            {labels.map((label) => (
                <Item title={label} contacts={phoneBook[label]} key={label} render={render} />
            ))}
        </div>
    );
};

PhoneBook.propTypes = {
    phoneBook: PropTypes.objectOf(PropTypes.array.isRequired).isRequired,
    render: PropTypes.func.isRequired,
};

export default PhoneBook;
