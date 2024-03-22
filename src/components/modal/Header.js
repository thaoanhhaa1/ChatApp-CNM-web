import React from 'react';
import PropTypes from 'prop-types';
import { CloseLineIcon } from '~/assets';

const Header = ({ children, onClose }) => {
    return (
        <div className="flex justify-between items-center p-2 ex:p-3 sm:p-4 border-b border-separate dark:border-dark-separate">
            <h5 className="text-lg leading-normal font-semibold">{children}</h5>
            <span onClick={onClose} className="cursor-pointer p-1 text-secondary dark:text-dark-secondary">
                <CloseLineIcon className="w-4 h-4" />
            </span>
        </div>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Header;
