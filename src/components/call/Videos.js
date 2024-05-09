import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from 'agora-rtc-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MicFillIcon, MicStopIcon, PhoneFillIcon, VideoFillIcon, VideoStopIcon } from '~/assets';
import Button from './Button';
import CallCover from './CallCover';

const APP_ID = process.env.REACT_APP_AGORA_APP_ID;
// console.log('🚀 ~ APP_ID:', APP_ID);

const Videos = () => {
    const [channel] = useState('test');
    const { user } = useSelector((state) => state.user);

    useJoin({ appid: APP_ID, channel: channel, token: null });
    //local user
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    //remote users
    const remoteUsers = useRemoteUsers();

    const toggleVideo = () => setCamera((prev) => !prev);
    const toggleAudio = () => setMic((prev) => !prev);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 relative bg-[#1a1a1a]">
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className=" grid grid-cols-2 gap-1 justify-center w-full max-w-[calc(min(100vw,(100vh_-_50px)*_16_/_9))]">
                        <div className="user aspect-video">
                            <LocalUser
                                audioTrack={localMicrophoneTrack}
                                cameraOn={cameraOn}
                                micOn={micOn}
                                videoTrack={localCameraTrack}
                                cover={() => <CallCover user={user} />}
                            >
                                <samp className="user-name">You</samp>
                            </LocalUser>
                        </div>
                        {remoteUsers.map((remoteUser) => (
                            <div className="user aspect-video" key={remoteUser.uid}>
                                <RemoteUser cover={() => <CallCover user={user} />} user={remoteUser}>
                                    <samp className="user-name">{remoteUser.uid}</samp>
                                </RemoteUser>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-[50px] bg-[#0a0a0a] flex justify-center items-center">
                <Button onClick={toggleVideo}>{cameraOn ? <VideoFillIcon /> : <VideoStopIcon />}</Button>
                <Button className="bg-red-500">
                    <PhoneFillIcon />
                </Button>
                <Button onClick={toggleAudio}>{micOn ? <MicFillIcon /> : <MicStopIcon />}</Button>
            </div>
        </div>
    );
};

Videos.propTypes = {};

export default Videos;
