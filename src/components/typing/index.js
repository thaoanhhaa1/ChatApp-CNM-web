import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Typing = ({ className, isChat }) => {
    return (
        <span className={classNames(isChat ? 'text-white' : 'text-primary-color', className)}>
            <span className={classNames('text-current', isChat ? 'text-mm font-normal' : 'text-sm font-medium')}>
                typing
            </span>
            <span className="inline-block animate-wave ml-1 w-1 h-1 rounded-full bg-current"></span>
            <span className="inline-block animate-wave animation-delay--1100 ml-1 w-1 h-1 rounded-full bg-current"></span>
            <span className="inline-block animate-wave animation-delay--900 ml-1 w-1 h-1 rounded-full bg-current"></span>
        </span>
    );
};

Typing.propTypes = {
    className: PropTypes.string,
    isChat: PropTypes.bool,
};

export default Typing;
