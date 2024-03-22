import PropTypes from 'prop-types';

const Wrapper = ({ children }) => {
    return <div className="px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6">{children}</div>;
};

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
