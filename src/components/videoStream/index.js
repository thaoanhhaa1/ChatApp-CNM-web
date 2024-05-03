import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { classNames } from '~/utils';

const VideoStream = ({ stream, user = {}, absolute = false }) => {
    const localVideo = useRef();

    useEffect(() => {
        if (localVideo.current) localVideo.current.srcObject = stream;
    }, [stream, localVideo]);

    return (
        <div className={classNames(absolute ? 'absolute right-10 bottom-10' : 'relative')}>
            <video className="w-[300px] h-[300px]" playsInline muted ref={localVideo} autoPlay />
            {stream ? null : <img className="absolute inset-0 w-[300px] h-[300px]" alt={user.name} src={user.avatar} />}
        </div>
    );
};

VideoStream.propTypes = {
    stream: PropTypes.object,
};

export default VideoStream;
