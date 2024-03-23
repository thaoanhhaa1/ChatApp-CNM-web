import PropTypes from 'prop-types';
import Button from './Button';

const Reaction = ({ children }) => {
    return (
        <div className="px-3 py-2 bg-white dark:bg-dark-popup-bg rounded-full shadow-reaction dark:shadow-none flex">
            {children}
        </div>
    );
};

Reaction.propTypes = {
    children: PropTypes.node.isRequired,
};

Reaction.Button = Button;

export default Reaction;
