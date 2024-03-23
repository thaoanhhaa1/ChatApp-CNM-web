import PropTypes from 'prop-types';

const FormLabel = ({ children, onClick = () => {} }) => {
    return (
        <label onClick={onClick} className="cursor-pointer block text-primary text-mm leading-5 font-medium mb-2">
            {children}
        </label>
    );
};

FormLabel.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default FormLabel;
