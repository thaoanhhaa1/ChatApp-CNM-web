import PropTypes from 'prop-types';
import { useMemo } from 'react';

const MessageVideo = ({ file }) => {
    const src = useMemo(() => file.link || URL.createObjectURL(file), [file]);

    const handleLoad = () => URL.revokeObjectURL(src);

    return (
        <div className="relative flex justify-center items-center rounded-md overflow-hidden">
            <video onLoad={handleLoad} width="320" height="240" controls>
                <source src={src} type={file.type} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

MessageVideo.propTypes = {
    file: PropTypes.object.isRequired,
};

export default MessageVideo;
