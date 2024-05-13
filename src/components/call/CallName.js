import PropTypes from 'prop-types';

const CallName = ({ name }) => {
    return <samp className="absolute text-sm px-1 left-0 bottom-0 bg-black bg-opacity-50 text-white">{name}</samp>;
};

CallName.propTypes = {
    name: PropTypes.string.isRequired,
};

export default CallName;
