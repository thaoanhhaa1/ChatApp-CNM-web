import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const UnderlineInput = ({
    align = 'left',
    Icon,
    more,
    placeholder = '',
    type = 'text',
    value,
    containerClassName,
    onChangeText = () => {},
    ...props
}) => {
    const handleChange = (e) => onChangeText(e.target.value);

    return (
        <div
            className={classNames(
                'rounded flex items-center gap-2 transition-colors border-b border-[#ecedf0] focus-within:border-primary-color',
                containerClassName,
            )}
        >
            {Icon ? <Icon className="flex-shrink-0 w-4 h-4" /> : null}
            {more}
            <input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={classNames(
                    'text-sm flex-1 outline-none py-1.5 text-primary placeholder:text-secondary',
                    align === 'center' && 'text-center',
                )}
                type={type}
                {...props}
            />
        </div>
    );
};

UnderlineInput.propTypes = {
    align: PropTypes.string,
    containerClassName: PropTypes.string,
    Icon: PropTypes.func,
    more: PropTypes.node,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
};

export default UnderlineInput;
