import PropTypes from 'prop-types';

const Button = ({ icon, onClick = () => {} }) => {
    const Icon = icon;

    return (
        <button
            onClick={onClick}
            className="flex justify-center items-center w-[26px] h-[26px] text-secondary dark:text-dark-secondary"
        >
            <Icon className="w-[18px] h-[18px]" />
        </button>
    );
};

Button.propTypes = {
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

export default Button;
