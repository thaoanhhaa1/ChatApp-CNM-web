import PropTypes from 'prop-types';
import { CheckIcon } from '~/assets';
import { classNames } from '~/utils';

const Checkbox = ({ className, rounded, checked, onChange = () => {} }) => {
    const handleChange = (e) => onChange(e.target.checked);

    return (
        <label
            className={classNames(
                'flex justify-center items-center w-5 h-5 rounded-full border border-primary-color',
                checked && 'bg-primary-color',
                (rounded && 'rounded-full') || 'rounded-md',
                className,
            )}
        >
            <input checked={checked} onChange={handleChange} type="checkbox" hidden />

            <CheckIcon className="w-4 h-4 text-white dark:text-[#242526]" />
        </label>
    );
};

Checkbox.propTypes = {
    rounded: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Checkbox;
