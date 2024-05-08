import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import NewWindow from 'react-new-window';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MicFillIcon, MicStopIcon, PhoneFillIcon, VideoFillIcon, VideoStopIcon } from '~/assets';
import { callType } from '~/constants';
import { addEndedUserIds, addNotifiedUserIds, updateRoles } from '~/features/calling/callingSlice';
import { useCalling } from '~/hooks';
import { createPeer, getMediaStream } from '~/utils';
import VideoStream from '../videoStream';
import Button from './Button';

const VideoCalling = ({ onClickOutside }) => {
    const { acceptUserIds, users, sender, rejectUserIds, notifiedUserIds, endedUserIds, _id, roles, type } =
        useSelector((state) => state.calling);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const { handleClickOutside } = useCalling();
    const [stream, setStream] = useState();
    console.error('🚀 ~ VideoCalling ~ stream:', stream);
    const [streams, setStreams] = useState({});
    console.error('🚀 ~ VideoCalling ~ streams:', streams);
    const joinedUserIds = useMemo(() => [sender._id, ...acceptUserIds], [acceptUserIds, sender._id]);
    // const acceptUsers = useMemo(() => {
    //     const usersWithoutMe = [];

    //     users.forEach((u) => {
    //         if (acceptUserIds.includes(u._id) && u._id !== user._id) {
    //             usersWithoutMe.push(u);
    //         }
    //     });

    //     if (sender._id !== user._id) usersWithoutMe.push(sender);

    //     return usersWithoutMe;
    // }, [acceptUserIds, sender, user._id, users]);
    const [role, setRole] = useState({
        video: type === callType.VIDEO,
        audio: true,
    });
    const [myPeer, setMyPeer] = useState(null);
    const [peerIds, setPeerIds] = useState({});
    const timeoutIdRef = useRef();
    const dispatch = useDispatch();
    console.error('🚀 ~ VideoCalling ~ peerIds:', peerIds);

    const toggleVideo = () => setRole((prev) => ({ ...prev, video: !prev.video }));
    const toggleAudio = () => setRole((prev) => ({ ...prev, audio: !prev.audio }));

    // Stream
    useEffect(() => {
        async function getStream() {
            const stream = await getMediaStream({ video: type === callType.VIDEO });
            console.error('🚀 ~ getStream ~ stream:', stream);

            setStream(stream);
        }

        getStream();
    }, [type]);

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
            call.on('stream', (remoteStream) => {
                dispatch(updateRoles({ userId, video: true, audio: true }));
                setStreams((prev) => ({ ...prev, [userId]: remoteStream }));
            });
            call.on('close', () => {
                dispatch(addEndedUserIds({ senderId: userId }));
            });
        });

        return () => myPeer.off('call');
    }, [dispatch, myPeer, peerIds, stream]);

    // Handle error event
    useEffect(() => {
        if (!myPeer) return;

        myPeer.on('error', (error) => console.error(error));

        return () => myPeer.off('error');
    }, [myPeer]);

    useEffect(() => {
        console.error('🚀 ~ VideoCalling ~ peerIds:', peerIds);
        console.error('🚀 ~ VideoCalling ~ stream:', stream);

        Object.keys(peerIds).forEach((userId) => {
            const call = myPeer.call(peerIds[userId], stream, { metadata: user._id });
            call?.on('stream', (remoteStream) => {
                setStreams((prev) => ({ ...prev, [userId]: remoteStream }));
            });
            call.on('close', () => {
                dispatch(addEndedUserIds({ senderId: userId }));
            });
        });
    }, [dispatch, myPeer, peerIds, stream, user._id]);

    useEffect(() => {
        if (!myPeer) return;

        socket.on('peerId', ({ peerId, fromUserId: userId }) => {
            setPeerIds((prev) => ({ ...prev, [userId]: peerId }));

            const call = myPeer.call(peerId, stream, { metadata: user._id });

            if (!call) return;
            call.on('stream', (remoteStream) => setStreams((prev) => ({ ...prev, [userId]: remoteStream })));
            call.on('close', () => dispatch(addEndedUserIds({ senderId: userId })));
        });
    }, [dispatch, myPeer, socket, stream, user._id]);

    useEffect(() => {
        const newUserReject = rejectUserIds.at(-1);

        // TODO show reject in UI
        if (!newUserReject || notifiedUserIds.includes(newUserReject)) return;

        toast.info(`${newUserReject} has rejected the call`);
        dispatch(addNotifiedUserIds({ senderId: newUserReject }));
    }, [dispatch, notifiedUserIds, rejectUserIds]);

    useEffect(() => {
        const newUserEnded = endedUserIds.at(-1);

        // TODO show ended in UI
        if (!newUserEnded || notifiedUserIds.includes(newUserEnded)) return;

        toast.info(`${newUserEnded} has ended the call`);
        dispatch(addNotifiedUserIds({ senderId: newUserEnded }));
    }, [dispatch, endedUserIds, notifiedUserIds]);

    useEffect(() => {
        const prevId = timeoutIdRef.current;
        timeoutIdRef.current = setTimeout(() => {
            if (endedUserIds.length + rejectUserIds.length === users.length - 1)
                handleClickOutside(onClickOutside, stream)();
        }, 3000);

        return () => {
            if (prevId) clearTimeout(prevId);
        };
    }, [endedUserIds.length, handleClickOutside, onClickOutside, rejectUserIds.length, stream, users.length]);

    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        };
    }, []);

    useEffect(() => {
        socket.emit('toggleMediaStreamConstraints', { users, sender: user, _id, ...role });
    }, [_id, role, socket, user, users]);

    useEffect(() => {
        socket.on('toggleMediaStreamConstraints', ({ sender, video, audio }) => {
            dispatch(updateRoles({ userId: sender._id, video, audio }));
        });

        return () => socket.off('toggleMediaStreamConstraints');
    }, [dispatch, socket]);

    return (
        <NewWindow onUnload={handleClickOutside(onClickOutside, stream)}>
            <div className="h-screen w-screen flex flex-col">
                <div className="flex-1 relative bg-[#1a1a1a]">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className=" grid grid-cols-2 gap-1 justify-center max-w-[calc(min(100vw,(100vh_-_50px)*_16_/_9))]">
                            <VideoStream stream={stream} roles={role} user={user} />
                            {users.map((u) =>
                                [user._id, ...rejectUserIds, ...endedUserIds].includes(u._id) ? null : (
                                    <VideoStream stream={streams[u._id]} roles={roles[u._id]} user={u} key={u._id} />
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-[50px] bg-[#0a0a0a] flex justify-center items-center">
                    <Button onClick={toggleVideo}>{role.video ? <VideoFillIcon /> : <VideoStopIcon />}</Button>
                    <Button onClick={handleClickOutside(onClickOutside, stream)}>
                        <span className="bg-red-500 text-white rounded-full h-8 w-8 flex justify-center items-center">
                            <PhoneFillIcon />
                        </span>
                    </Button>
                    <Button onClick={toggleAudio}>{role.audio ? <MicFillIcon /> : <MicStopIcon />}</Button>
                </div>
            </div>
        </NewWindow>
    );
};

VideoCalling.propTypes = {
    onClickOutside: PropTypes.func,
};

export default VideoCalling;
