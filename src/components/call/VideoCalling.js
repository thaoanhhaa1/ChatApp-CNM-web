import { Peer } from 'peerjs';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import NewWindow from 'react-new-window';
import { useSelector } from 'react-redux';
import { useCalling } from '~/hooks';
import VideoStream from '../videoStream';
import CallingEmpty from './CallingEmpty';

const VideoCalling = ({ onClickOutside }) => {
    const { acceptUserIds, users, sender, _id } = useSelector((state) => state.calling);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const { handleClickOutside } = useCalling();
    const [stream, setStream] = useState(null);
    const [streams, setStreams] = useState({});
    const acceptUsers = useMemo(() => {
        const usersWithoutMe = [];

        users.forEach((u) => {
            if (acceptUserIds.includes(u._id) && u._id !== user._id) {
                usersWithoutMe.push(u);
            }
        });

        if (sender._id !== user._id) usersWithoutMe.push(sender);

        return usersWithoutMe;
    }, [acceptUserIds, sender, user._id, users]);
    const userVideo = useRef();
    const peersRef = useRef({});
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);

    const toggleVideo = () => setVideo((prev) => !prev);
    const toggleAudio = () => setAudio((prev) => !prev);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video, audio })
            .then((stream) => {
                setStream(stream);
                if (userVideo.current) userVideo.current.srcObject = stream;
            })
            .catch((error) => console.error(error));
    }, [audio, video]);

    useEffect(() => {
        const userIds = [sender._id, ...acceptUserIds];

        const myPosition = userIds.indexOf(user._id);

        userIds.forEach((userId, index) => {
            if (myPosition === index) return;

            const peer = new Peer({
                // DEV
                host: 'localhost',
                port: '4000',
                path: '/peerjs',
                key: 'peerjs',

                // PROD
                // host: 'homeless-eadith-vunguyendev.koyeb.app',
                // path: '/peerjs',
                // key: 'peerjs',
            });
            peersRef.current[userId] = peer;

            peer.on('open', (id) => {
                socket.emit('peerId', { peerId: id, fromUserId: user._id, toUserId: userId });
                console.log('🚀 ~ VideoCalling ~ id:', id);
            });

            peer.on('error', (error) => {
                console.error('🚀 ~ VideoCalling ~ error:', error);
            });

            if (myPosition > index) {
                peer.on('call', (call) => {
                    call.answer(stream);
                    call.on('stream', (remoteStream) => setStreams((prev) => ({ ...prev, [userId]: remoteStream })));
                });
            } else {
                socket.on('peerId', ({ peerId, fromUserId: userId }) => {
                    const call = peer.call(peerId, stream);
                    call?.on('stream', (remoteStream) => setStreams((prev) => ({ ...prev, [userId]: remoteStream })));
                });
            }
        });

        return () => {
            Object.keys(peersRef.current).forEach((userId) => {
                if (peersRef.current[userId]) {
                    peersRef.current[userId].destroy();
                    delete peersRef.current[userId];
                }
            });
        };
    }, [_id, acceptUserIds, sender._id, socket, stream, user._id]);

    return (
        <NewWindow onUnload={handleClickOutside(onClickOutside, stream)}>
            <div className="h-screen w-screen flex flex-col">
                <div className="relative flex-1">
                    {acceptUserIds.length ? (
                        <div className="flex">
                            <VideoStream stream={stream} user={user} />
                            {acceptUsers.map((user) => (
                                <VideoStream stream={streams[user._id]} user={user} key={user._id} />
                            ))}
                        </div>
                    ) : (
                        <CallingEmpty />
                    )}
                </div>

                <div className="flex">
                    <button onClick={toggleVideo}>{video ? 'Turn off video' : 'Turn on video'}</button>
                    <button onClick={toggleAudio}>{audio ? 'Turn off audio' : 'Turn on audio'}</button>
                    <button>End call</button>
                </div>
            </div>
        </NewWindow>
    );
};

VideoCalling.propTypes = {
    onClickOutside: PropTypes.func,
};

export default VideoCalling;
