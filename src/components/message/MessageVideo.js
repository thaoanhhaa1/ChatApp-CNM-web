import PropTypes from 'prop-types';
import { useMemo } from 'react';

const MessageVideo = ({ file, loading }) => {
    const src = useMemo(() => file.link || URL.createObjectURL(file), [file]);

    const handleLoad = () => URL.revokeObjectURL(src);

    return (
        <div className="relative flex justify-center items-center rounded-md overflow-hidden">
            <video onLoad={handleLoad} width="320" height="240" controls>
                <source src={src} type={file.type} />
                Your browser does not support the video tag.
            </video>

            {loading ? (
                <>
                    <span className="absolute inset-0 backdrop-blur-sm"></span>
                    <span className="absolute w-10 h-10 border-2 border-primary-color border-t-transparent animate-spin rounded-full"></span>
                </>
            ) : null}
        </div>
    );
};

MessageVideo.propTypes = {
    file: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

export default MessageVideo;
