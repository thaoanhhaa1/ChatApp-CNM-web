import PropTypes from 'prop-types';
import images from '~/assets/images';

const RequestEmpty = ({ title }) => {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
            <img src={images.invitationEmpty} alt="" />
            <span className="mt-4 text-sm text-secondary dark:text-dark-secondary">{title}</span>
        </div>
    );
};

RequestEmpty.propTypes = {
    title: PropTypes.string.isRequired,
};

export default RequestEmpty;
