import PropTypes from 'prop-types';

const SearchItem = ({ title, children }) => {
    return (
        <div>
            <h4 className="px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 text-sm font-medium">{title}</h4>
            <div className="mt-2">{children}</div>
        </div>
    );
};

SearchItem.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default SearchItem;
