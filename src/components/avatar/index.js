import PropTypes from 'prop-types';

const Avatar = ({ src, alt = '' }) => {
    return <img className="w-[36px] h-[36px] rounded-full" src={src} alt={alt} />;
};

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default Avatar;
