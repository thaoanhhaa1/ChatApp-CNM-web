import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Switch = ({ checked, onChange }) => {
    const handleChange = (e) => onChange(e.target.checked);

    return (
        <label
            className={classNames(
                'w-8 h-4 p-0.5 rounded-full ease-linear duration-200 cursor-pointer',
                checked ? 'bg-primary-color' : 'bg-[#b1b5b9] dark:bg-[#696b6b]',
            )}
        >
            <input checked={checked} onChange={handleChange} type="checkbox" hidden />
            <span
                className={classNames(
                    'w-3 h-3 rounded-full bg-white dark:bg-[#2c2e2f] block ease-linear duration-200',
                    (checked && 'translate-x-4 bg-opacity-100') || 'bg-opacity-80',
                )}
            />
        </label>
    );
};

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Switch;
