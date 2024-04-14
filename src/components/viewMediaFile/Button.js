import PropTypes from 'prop-types';

const Button = ({ children, onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className="text-white hover:bg-gray-300 hover:bg-opacity-30 w-8 h-8 rounded-md transition-colors flex justify-center items-center"
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default Button;
