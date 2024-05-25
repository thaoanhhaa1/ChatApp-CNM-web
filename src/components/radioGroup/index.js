import PropTypes from 'prop-types';
import Radio from './Radio';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const RadioGroup = ({ label, data, name, value, onChange }) => {
    return (
        <div>
            {label && (
                <label htmlFor={name} className="block text-mm leading-5 font-medium mb-2">
                    {label}
                </label>
            )}
            <ul className="items-center w-full text-sm font-medium rounded-lg sm:flex">
                {data.map((item, index) => (
                    <li className="flex-1" key={index}>
                        <Radio {...item} name={name} checked={value === item.value} onChange={onChange} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

RadioGroup.propTypes = {
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withErrorBoundary(RadioGroup, {
    fallback: null,
    onError: (error, info) => {
        toast.error('RadioGroup::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
