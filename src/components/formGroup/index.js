import PropTypes from 'prop-types';

const FormGroup = ({ label, name, value, onChange, error, ...props }) => {
    return (
        <div>
            {label && (
                <label htmlFor={name} className="block text-primary text-mm leading-5 font-medium mb-2">
                    {label}
                </label>
            )}
            <input
                id={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-primary text-sm leading-normal focus:outline-none focus:shadow-outline"
                name={name}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <div className="text-red-500 text-ss mt-1">{error}</div>}
        </div>
    );
};

FormGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default FormGroup;
