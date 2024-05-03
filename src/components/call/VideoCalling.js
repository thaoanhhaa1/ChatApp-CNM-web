import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import NewWindow from 'react-new-window';
import { useSelector } from 'react-redux';
import { useCalling } from '~/hooks';
import { createPeer, getMediaStream } from '~/utils';
import VideoStream from '../videoStream';
import CallingEmpty from './CallingEmpty';

const VideoCalling = ({ onClickOutside }) => {
    const { acceptUserIds, users, sender, _id } = useSelector((state) => state.calling);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const { handleClickOutside } = useCalling();
    const [stream, setStream] = useState();
    console.error('🚀 ~ VideoCalling ~ stream:', stream);
    const [streams, setStreams] = useState({});
    console.error('🚀 ~ VideoCalling ~ streams:', streams);
    const joinedUserIds = useMemo(() => [sender._id, ...acceptUserIds], [acceptUserIds, sender._id]);
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
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);
    const [myPeer, setMyPeer] = useState(null);
    const [peerIds, setPeerIds] = useState({});
    console.error('🚀 ~ VideoCalling ~ peerIds:', peerIds);

    const toggleVideo = () => setVideo((prev) => !prev);
    const toggleAudio = () => setAudio((prev) => !prev);

    // Stream
    useEffect(() => {
        async function getStream() {
            const stream = await getMediaStream({ video, audio });
            console.error('🚀 ~ getStream ~ stream:', stream);

            setStream(stream);
        }

        getStream();
    }, [audio, video]);

    // Create peer
    useEffect(() => {
        if (typeof stream === 'undefined') return;

        const peer = createPeer();
        console.error('🚀 ~ useEffect ~ peer:', peer);

        setMyPeer(peer);
    }, [stream]);

    // Handle open event
    useEffect(() => {
        if (!myPeer) return;

        myPeer.on('open', (id) => {
            socket.emit('peerId', { peerId: id, fromUserId: user._id, toUserIds: joinedUserIds });
            console.error('🚀 ~ VideoCalling ~ id:', id);
        });

        return () => myPeer.off('open');
    }, [joinedUserIds, myPeer, socket, user._id]);

    // Handle call event
    useEffect(() => {
        if (!myPeer) return;

        myPeer.on('call', (call) => {
            console.error('🚀 ~ myPeer.on ~ call:', call);
            console.error('🚀 ~ myPeer.on ~ stream:', stream);
            console.error('🚀 ~ myPeer.on ~ peerIds:', peerIds);

            const userId = call.metadata;
            const peerId = call.peer;

            if (peerIds[userId] === peerId) return;

            setPeerIds((prev) => ({ ...prev, [userId]: peerId }));
            call.answer(stream);
            call.on('stream', (remoteStream) => setStreams((prev) => ({ ...prev, [userId]: remoteStream })));
        });

        return () => myPeer.off('call');
    }, [myPeer, peerIds, stream]);

    // Handle error event
    useEffect(() => {
        if (!myPeer) return;

        myPeer.on('error', (error) => console.error(error));
    }, [myPeer]);

    useEffect(() => {
        console.error('🚀 ~ VideoCalling ~ peerIds:', peerIds);
        console.error('🚀 ~ VideoCalling ~ stream:', stream);

        Object.keys(peerIds).forEach((userId) => {
            const call = myPeer.call(peerIds[userId], stream, { metadata: user._id });
            call?.on('stream', (remoteStream) => setStreams((prev) => ({ ...prev, [userId]: remoteStream })));
        });
    }, [myPeer, peerIds, stream, user._id]);

    useEffect(() => {
        if (!myPeer) return;

        socket.on('peerId', ({ peerId, fromUserId: userId }) => {
            console.error('🚀 ~ socket.on ~ userId:', userId);
            setPeerIds((prev) => ({ ...prev, [userId]: peerId }));

            const call = myPeer.call(peerId, stream, { metadata: user._id });
            call?.on('stream', (remoteStream) => {
                console.error('🚀 ~ call?.on ~ userId:', userId);
                console.error('🚀 ~ call?.on ~ remoteStream:', remoteStream);

                setStreams((prev) => ({ ...prev, [userId]: remoteStream }));
            });
        });
    }, [myPeer, socket, stream, user._id]);

    return (
        <NewWindow onUnload={handleClickOutside(onClickOutside, stream)}>
            <div className="h-screen w-screen flex flex-col">
                <div className="relative flex-1">
                    {acceptUserIds.length ? (
                        <div className="flex flex-wrap">
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
