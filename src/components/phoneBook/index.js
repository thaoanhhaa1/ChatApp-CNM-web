import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Item from './Item';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

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

export default withErrorBoundary(PhoneBook, {
    fallback: null,
    onError: (error, info) => {
        toast.error('PhoneBook::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
