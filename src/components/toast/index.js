import PropTypes from 'prop-types';
import Portal from '../portal';
import { classNames } from '~/utils';

const Toast = ({ message, className }) => {
    return (
        <Portal>
            <span
                className={classNames(
                    'select-none pointer-events-none fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 max-w-[30%] bg-black bg-opacity-80 text-sm text-white px-5 py-4 z-51 rounded-md',
                    className,
                )}
            >
                {message}
            </span>
        </Portal>
    );
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Toast;
