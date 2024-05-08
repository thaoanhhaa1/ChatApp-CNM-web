import PropTypes from 'prop-types';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { callType } from '~/constants';
import Avatar from '../avatar';
import { classNames } from '~/utils';

const VideoStream = ({ stream, user = {}, roles = {} }) => {
    const { type, endedUserIds } = useSelector((state) => state.calling);
    const localVideo = useRef();
    const [muted, setMuted] = useState(true);
    const showImage = useMemo(
        () => !roles.video || type !== callType.VIDEO || endedUserIds.includes(user._id),
        [endedUserIds, roles.video, type, user._id],
    );

    useEffect(() => {
        if (localVideo.current) localVideo.current.srcObject = stream;
    }, [stream, localVideo]);

    const handleLoadedVideo = () => localVideo.current && setMuted(false);

    return (
        <div className="relative aspect-video">
            {showImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-lg w-full h-full"
                            style={{
                                backgroundImage: `url(${user.avatar})`,
                            }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <Avatar
                                src={user.avatar}
                                size="50%"
                                className="border-[5px] border-gray-500 border-opacity-20"
                                containerClassName="!w-unset aspect-square"
                            />
                            <span className="text-white">Đang đổ chuông...</span>
                        </div>
                    </div>
                </div>
            )}
            <video
                onLoad={handleLoadedVideo}
                className={classNames('w-full h-full', showImage && 'opacity-0')}
                playsInline
                muted={muted || !roles.audio}
                ref={localVideo}
                autoPlay
            />
        </div>
    );
};

VideoStream.propTypes = {
    stream: PropTypes.object,
    user: PropTypes.object.isRequired,
};

export default memo(VideoStream);
