import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { statusUser } from '~/constants';
import { classNames } from '~/utils';

const Avatar = ({ size = '36px', src, alt = '', status = statusUser.OFFLINE, className, containerClassName }) => {
    const [image, setImage] = useState(src);

    const handleError = () => setImage(process.env.REACT_APP_FALLBACK_AVATAR);

    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className={classNames('relative rounded-full flex-shrink-0', containerClassName)}
        >
            <LazyLoadImage
                className={classNames('w-full h-full object-cover rounded-full', className)}
                src={image}
                alt={alt}
                onError={handleError}
            />
            {status !== statusUser.OFFLINE && (
                <div
                    className={classNames(
                        'absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#262e35]',
                        status === statusUser.ONLINE && 'bg-[#06d6a0]',
                    )}
                />
            )}
        </div>
    );
};

Avatar.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    status: PropTypes.oneOf(Object.values(statusUser)),
    className: PropTypes.string,
    containerClassName: PropTypes.string,
};

export default memo(Avatar);
