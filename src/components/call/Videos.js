import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from 'agora-rtc-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MicFillIcon, MicStopIcon, PhoneFillIcon, VideoFillIcon, VideoStopIcon } from '~/assets';
import { callType } from '~/constants';
import { useCalling } from '~/hooks';
import { findUserById, formatTime, getAgoraUid } from '~/utils';
import Button from './Button';
import CallCover from './CallCover';
import CallName from './CallName';

const APP_ID = process.env.REACT_APP_AGORA_APP_ID;

const Videos = () => {
    const { user } = useSelector((state) => state.user);
    const uid = useMemo(() => getAgoraUid(user._id), [user._id]);
    const { _id, type, users, notifiedUserIds } = useSelector((state) => state.calling);
    const { handleClickOutside } = useCalling();

    useJoin({ appid: APP_ID, channel: _id, token: null, uid });
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(type === callType.VIDEO);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    const remoteUsers = useRemoteUsers();
    console.log('🚀 ~ Videos ~ remoteUsers:', remoteUsers);

    const acceptUserIds = useMemo(() => remoteUsers.map((user) => user.uid), [remoteUsers]);
    const [time, setTime] = useState(0);

    const toggleVideo = () => setCamera((prev) => !prev);
    const toggleAudio = () => setMic((prev) => !prev);

    const handleCloseTrack = useCallback(() => {
        localCameraTrack?.close();
        localMicrophoneTrack?.close();
    }, [localCameraTrack, localMicrophoneTrack]);

    useEffect(() => {
        if (notifiedUserIds.length >= users.length - 1) handleClickOutside(handleCloseTrack)();
    }, [handleClickOutside, handleCloseTrack, notifiedUserIds.length, users.length]);

    useEffect(() => {
        if (time === 0 && acceptUserIds.length === 0) return;

        const timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, [acceptUserIds.length, time]);

    const renderRemoteUser = useCallback(
        (remoteUser) => {
            const user = findUserById(users, remoteUser.uid);

            return (
                <div className="user aspect-video" key={remoteUser.uid}>
                    <RemoteUser
                        playVideo={type === callType.VIDEO}
                        cover={() => <CallCover user={user} />}
                        user={remoteUser}
                    >
                        <CallName name={user?.name} />
                    </RemoteUser>
                </div>
            );
        },
        [type, users],
    );

    const renderOtherUser = useCallback(
        (u) =>
            [...acceptUserIds, ...notifiedUserIds.map(getAgoraUid), uid].includes(getAgoraUid(u._id)) ? null : (
                <div className="user aspect-video relative" key={u._id}>
                    <CallCover user={u} />
                    <CallName name={u?.name} />
                </div>
            ),
        [acceptUserIds, notifiedUserIds, uid],
    );

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 relative bg-[#1a1a1a]">
                <div className="absolute inset-0 flex justify-center items-center max-w-[calc(min(100vw,(100vh_-_50px)*_16_/_9))] mx-auto">
                    <div className=" grid grid-cols-2 gap-1 justify-center w-full max-w-[calc(min(100vw,(100vh_-_50px)*_16_/_9))]">
                        <div className="user aspect-video">
                            <LocalUser
                                cameraOn={cameraOn}
                                micOn={micOn}
                                videoTrack={localCameraTrack}
                                audioTrack={localMicrophoneTrack}
                                playAudio={false}
                                cover={() => <CallCover user={user} />}
                            >
                                <CallName name="You" />
                            </LocalUser>
                        </div>
                        {remoteUsers.map(renderRemoteUser)}
                        {users.map(renderOtherUser)}
                    </div>

                    {time === 0 && acceptUserIds.length === 0 ? null : (
                        <div className="bg-[#1a1a1a] text-success text-sm px-1 font-semibold absolute top-0 left-0">
                            {formatTime(time)}
                        </div>
                    )}
                </div>
            </div>

            <div className="h-[50px] bg-[#0a0a0a] flex justify-center items-center">
                <Button disabled={type !== callType.VIDEO} onClick={toggleVideo}>
                    {cameraOn ? <VideoFillIcon /> : <VideoStopIcon />}
                </Button>
                <Button className="bg-red-500" onClick={handleClickOutside(handleCloseTrack)}>
                    <PhoneFillIcon />
                </Button>
                <Button onClick={toggleAudio}>{micOn ? <MicFillIcon /> : <MicStopIcon />}</Button>
            </div>
        </div>
    );
};

Videos.propTypes = {};

export default Videos;
