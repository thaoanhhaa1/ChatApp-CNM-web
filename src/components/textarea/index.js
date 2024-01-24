import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Textarea = ({ outline, placeholder = '', className = '', ...props }) => {
    return (
        <textarea
            placeholder={placeholder}
            className={classNames(
                'border rounded transition-all flex-1 px-2 sm:px-4 py-1 sm:py-2 outline-none text-sm leading-normal placeholder:text-secondary dark:placeholder:text-dark-secondary text-input dark:text-dark-primary',
                outline
                    ? 'bg-white border-separate focus:border-input dark:border-dark-separate dark:focus-within:border-dark-sidebar-item-color dark:bg-dark-sidebar-sub-bg'
                    : 'bg-input-bg dark:bg-dark-input-bg',
                className,
            )}
            {...props}
        />
    );
};

Textarea.propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
    outline: PropTypes.bool,
};

export default Textarea;
