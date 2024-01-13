import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({ label, value, name, checked, onChange }) => {
    return (
        <div className="flex items-center ps-3">
            <input
                type="radio"
                id={value}
                name={name}
                value={value}
                className="w-4 h-4"
                checked={checked}
                onChange={onChange}
            />
            {label && (
                <label htmlFor="male" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </label>
            )}
        </div>
    );
};

Radio.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Radio;
