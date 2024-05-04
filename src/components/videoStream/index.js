import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from 'react';

const VideoStream = ({ stream, user = {}, roles = {} }) => {
    console.log('🚀 ~ VideoStream ~ roles:', roles);
    console.log('🚀 ~ VideoStream ~ user:', user);
    const localVideo = useRef();
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        if (localVideo.current) localVideo.current.srcObject = stream;
    }, [stream, localVideo]);

    const handleLoadedVideo = () => {
        if (localVideo.current) setMuted(false);
    };

    return (
        <div className="relative">
            <div className="relative">
                <video
                    onLoad={handleLoadedVideo}
                    className="w-[300px] h-[300px]"
                    playsInline
                    muted={muted || !roles.audio}
                    ref={localVideo}
                    autoPlay
                />
                {roles.video ? null : (
                    <img className="absolute inset-0 w-[300px] h-[300px]" alt={user.name} src={user.avatar} />
                )}
            </div>
            <h4>{user._id}</h4>
        </div>
    );
};

VideoStream.propTypes = {
    stream: PropTypes.object,
    user: PropTypes.object.isRequired,
};

export default memo(VideoStream);
