import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useBoolean } from '~/hooks';
import ViewMediaFile from '../viewMediaFile';

const MessageVideo = ({ file }) => {
    const src = useMemo(() => file.link || URL.createObjectURL(file), [file]);
    const { value: showViewImage, setTrue: setShowViewImage, setFalse: setHideViewImage } = useBoolean(false);

    useEffect(() => {
        return () => URL.revokeObjectURL(src);
    }, [src]);

    return (
        <div
            onClick={setShowViewImage}
            className="relative flex justify-center items-center rounded-md overflow-hidden"
        >
            <video width="320" height="240" controls>
                <source src={src} type={file.type} />
                Your browser does not support the video tag.
            </video>
            {showViewImage && (
                <ViewMediaFile type="video" name={file.name} onClose={setHideViewImage} url={src} title={file.name} />
            )}
        </div>
    );
};

MessageVideo.propTypes = {
    file: PropTypes.object.isRequired,
};

export default MessageVideo;
