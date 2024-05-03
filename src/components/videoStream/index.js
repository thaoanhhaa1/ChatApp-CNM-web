import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const VideoStream = ({ stream, user = {} }) => {
    const localVideo = useRef();
    const { user: me } = useSelector((state) => state.user);
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);

    useEffect(() => {
        if (stream)
            stream.getTracks().forEach((track) => {
                if (track.kind === 'video') setVideo(track.enabled);
                if (track.kind === 'audio') setAudio(track.enabled);
            });

        if (localVideo.current) localVideo.current.srcObject = stream;
    }, [stream, localVideo]);

    return (
        <div className="relative">
            <div className="relative">
                <video
                    className="w-[300px] h-[300px]"
                    playsInline
                    // muted={!audio || user._id === me._id}
                    muted
                    ref={localVideo}
                    autoPlay
                />
                {video ? null : (
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
