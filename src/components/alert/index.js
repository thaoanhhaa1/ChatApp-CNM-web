import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Alert = ({ Icon, severity, children, className }) => {
    return (
        <div
            className={classNames(
                'flex gap-2 ex:gap-2.5 sm:gap-3 justify-center items-center px-2 ex:px-2.5 sm:px-3 py-1 sm:py-2 rounded',
                severity === 'warning' && 'text-[#ad8500] dark:text-[#fadb14] bg-[#fff7db] dark:bg-[#614700]',
                className,
            )}
        >
            <span>
                <Icon className="w-6 h-6" />
            </span>
            <span className="text-sm leading-normal">{children}</span>
        </div>
    );
};

Alert.propTypes = {
    Icon: PropTypes.func.isRequired,
    severity: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Alert;
