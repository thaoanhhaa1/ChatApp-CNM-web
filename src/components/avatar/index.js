import PropTypes from 'prop-types';
import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { classNames } from '~/utils';

const Avatar = ({ size = '36px', src, alt = '', status = 'OFFLINE', className, containerClassName }) => {
    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className={classNames('relative rounded-full', containerClassName)}
        >
            <LazyLoadImage
                className={classNames('w-full h-full object-cover rounded-full', className)}
                src={src}
                alt={alt}
            />
            {status !== 'OFFLINE' && (
                <div className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#262e35] bg-[#06d6a0]" />
            )}
        </div>
    );
};

Avatar.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    status: PropTypes.oneOf(['ONLINE', 'OFFLINE']),
    className: PropTypes.string,
    containerClassName: PropTypes.string,
};

export default memo(Avatar);
