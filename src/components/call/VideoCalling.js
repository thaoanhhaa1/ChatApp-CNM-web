import { Peer } from 'peerjs';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import NewWindow from 'react-new-window';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
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
    const acceptUsers = useMemo(
        () => [...users.filter((u) => acceptUserIds.includes(u._id), sender)],
        [acceptUserIds, sender, users],
    );
    const userVideo = useRef();
    const containerRef = useRef();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                if (userVideo.current) userVideo.current.srcObject = stream;
            })
            .catch((error) => console.error(error));
    }, []);

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

            peer.on('open', (id) => {
                socket.emit('peerId', { peerId: id, fromUserId: user._id, toUserId: userId });
                console.log('🚀 ~ VideoCalling ~ id:', id);
            });

            peer.on('error', (error) => {
                console.error('🚀 ~ VideoCalling ~ error:', error);
            });

            if (myPosition > index) {
                // Answerer
                console.log('🚀 ~ VideoCalling ~ Answerer:', userId);
                peer.on('call', (call) => {
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', (remoteStream) => {
                        // Show stream in some <video> element.
                        console.group('Answerer...');
                        console.log('🚀 ~ VideoCalling ~ from userId:', userId);
                        console.log('🚀 ~ VideoCalling ~ to userId:', user._id);
                        console.log('🚀 ~ VideoCalling ~ remoteStream:', remoteStream);
                        console.groupEnd();
                        setStreams((prevStreams) => ({ ...prevStreams, [userId]: remoteStream }));
                    });
                });
            } else {
                // Caller
                socket.on('peerId', ({ peerId, fromUserId }) => {
                    console.log('🚀 ~ VideoCalling ~ Caller:', fromUserId);
                    const call = peer.call(peerId, stream);
                    call.on('stream', (remoteStream) => {
                        // Show stream in some <video> element.
                        console.group('Caller...');
                        console.log('🚀 ~ VideoCalling ~ from userId:', user._id);
                        console.log('🚀 ~ VideoCalling ~ to userId:', userId);
                        console.log('🚀 ~ VideoCalling ~ remoteStream:', remoteStream);
                        console.groupEnd();
                        setStreams((prevStreams) => ({ ...prevStreams, [fromUserId]: remoteStream }));
                    });
                });
            }
        });
    }, [_id, acceptUserIds, sender._id, socket, stream, user._id]);

    return (
        <NewWindow onUnload={handleClickOutside(onClickOutside, stream)}>
            <div className="w-full h-full relative" ref={containerRef}>
                {acceptUserIds.length ? (
                    <div className="flex">
                        {acceptUsers.map((user) => (
                            <VideoStream stream={streams[user._id]} user={user} key={v4()} />
                        ))}
                    </div>
                ) : (
                    <CallingEmpty />
                )}
                <div className="absolute right-10 bottom-10">
                    <video className="w-[300px] h-[300px]" playsInline muted ref={userVideo} autoPlay />
                    {stream ? null : (
                        <img className="absolute inset-0 w-[300px] h-[300px]" alt={user.name} src={user.avatar} />
                    )}
                </div>
            </div>
        </NewWindow>
    );
};

VideoCalling.propTypes = {
    onClickOutside: PropTypes.func,
};

export default VideoCalling;
