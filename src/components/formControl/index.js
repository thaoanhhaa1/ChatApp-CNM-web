import PropTypes from 'prop-types';
import { useRef } from 'react';
import FormHelperText from '../formHelperText';
import FormLabel from '../formLabel';

const FormControl = ({ label, control, error }) => {
    const ref = useRef();

    const handleClickLabel = () => {
        const inputElement = ref.current.querySelector('input');

        inputElement.focus();
    };

    return (
        <div ref={ref}>
            {label ? <FormLabel onClick={handleClickLabel}>{label}</FormLabel> : null}
            {control}
            {error ? <FormHelperText>{error}</FormHelperText> : null}
        </div>
    );
};

FormControl.propTypes = {
    label: PropTypes.string,
    control: PropTypes.node.isRequired,
    error: PropTypes.string,
};

export default FormControl;
