import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';
import { classNames } from '~/utils';

const RadioLabel = ({ icon, name, value, label, onChange, ...props }) => {
    const Icon = icon;
    const ref = useRef();
    const [checked, setChecked] = useState();

    const handleChange = (e) => onChange(e.target.value);

    useLayoutEffect(() => {
        setChecked(ref.current?.checked);
    }, [ref.current?.checked]);

    return (
        <label
            className={classNames(
                'px-3 h-8 rounded-full flex items-center transition-all duration-150 cursor-pointer',
                checked
                    ? 'bg-primary-color text-white'
                    : 'dark:text-[#e5e5e5] bg-[#eaedf0] dark:bg-[#353637] hover:bg-[#dfe2e7] dark:hover:bg-white dark:hover:bg-opacity-5',
            )}
        >
            <input ref={ref} name={name} value={value} type="radio" hidden onChange={handleChange} {...props} />
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
    onChange: PropTypes.func.isRequired,
    icon: PropTypes.func,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default RadioLabel;
