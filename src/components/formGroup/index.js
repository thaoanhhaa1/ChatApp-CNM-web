import PropTypes from 'prop-types';
import Label from './Label';

const FormGroup = ({ children }) => {
    return <div className="flex flex-col gap-2">{children}</div>;
};

FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
};

FormGroup.Label = Label;

export default FormGroup;
