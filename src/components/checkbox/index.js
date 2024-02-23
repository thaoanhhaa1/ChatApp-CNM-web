import PropTypes from 'prop-types';
import { CheckIcon } from '~/assets';
import { classNames } from '~/utils';

const Checkbox = ({ checked, onChange = () => {} }) => {
    const handleChange = (e) => onChange(e.target.checked);

    return (
        <label
            className={classNames(
                'flex justify-center items-center w-5 h-5 rounded-full border border-primary-color',
                checked && 'bg-primary-color',
            )}
        >
            <input checked={checked} onChange={handleChange} type="checkbox" hidden />

            <CheckIcon className="w-4 h-4 text-white" />
        </label>
    );
};

Checkbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Checkbox;
