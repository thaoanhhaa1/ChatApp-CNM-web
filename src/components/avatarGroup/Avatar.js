import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Avatar = ({ src, size = '32px', className }) => {
    return (
        <img
            style={{
                width: size,
                height: size,
            }}
            className={classNames('rounded-full border border-white', className)}
            src={src}
            alt=""
        />
    );
};

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
};

export default Avatar;
