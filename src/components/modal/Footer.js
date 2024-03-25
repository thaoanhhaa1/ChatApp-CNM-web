import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Footer = ({ children, className }) => {
    return (
        <div className={classNames('p-2 ex:p-3 sm:p-4 border-t border-separate dark:border-dark-separate', className)}>
            {children}
        </div>
    );
};

Footer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Footer;
