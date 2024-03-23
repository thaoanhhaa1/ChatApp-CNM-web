import PropTypes from 'prop-types';

const FormHelperText = ({ children }) => {
    return <p className="text-red-500 text-ss mt-1">{children}</p>;
};

FormHelperText.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FormHelperText;
