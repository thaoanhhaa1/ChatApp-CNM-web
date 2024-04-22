import PropTypes from 'prop-types';

const PersonalInformation = ({ label, value }) => {
    return (
        <div className="flex text-sm leading-normal">
            <span className="w-[100px] flex-shrink-0 text-secondary">{label}</span>
            <span className="flex-1 capitalize">{value}</span>
        </div>
    );
};

PersonalInformation.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default PersonalInformation;
