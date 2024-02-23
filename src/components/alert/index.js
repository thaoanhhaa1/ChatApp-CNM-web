import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Alert = ({ Icon, severity, children, className }) => {
    return (
        <div
            className={classNames(
                'flex gap-3 justify-center items-center px-3 py-2 rounded',
                severity === 'warning' && 'text-[#ad8500] bg-[#fff7db]',
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
