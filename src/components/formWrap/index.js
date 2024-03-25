import PropTypes from 'prop-types';
import Label from './Label';

const FormWrap = ({ children, error }) => {
    return (
        <div className="flex flex-col gap-2">
            {children}
            {error && <div className="text-red-500 text-ss -mt-1">{error}</div>}
        </div>
    );
};

FormWrap.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
};

FormWrap.Label = Label;

export default FormWrap;
