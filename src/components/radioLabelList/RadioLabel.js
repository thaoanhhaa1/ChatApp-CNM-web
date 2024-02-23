import PropTypes from 'prop-types';
import { useRef } from 'react';
import { classNames } from '~/utils';

const RadioLabel = ({ icon, name, value, label, onChange }) => {
    const Icon = icon;
    const ref = useRef();
    const checked = ref.current?.checked;

    const handleChange = (e) => onChange(e.target.value);

    return (
        <label
            className={classNames(
                'px-3 h-8 rounded-full flex items-center transition-all duration-150 cursor-pointer',
                checked ? 'bg-primary-color text-white' : 'bg-[#eaedf0] hover:bg-[#dfe2e7]',
            )}
        >
            <input ref={ref} name={name} value={value} type="radio" hidden onChange={handleChange} />
            <span className="text-sm font-medium">{label}</span>
            {icon && (
                <span className="ml-2">
                    <Icon />
                </span>
            )}
        </label>
    );
};

RadioLabel.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default RadioLabel;
