import PropTypes from 'prop-types';
import Label from './Label';

const FormWrap = ({ children }) => {
    return <div className="flex flex-col gap-2">{children}</div>;
};

FormWrap.propTypes = {
    children: PropTypes.node.isRequired,
};

FormWrap.Label = Label;

export default FormWrap;
