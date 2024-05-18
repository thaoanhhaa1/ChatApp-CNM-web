import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptCall, resetCalling, setShowCalling } from '~/features/calling/callingSlice';

const useCalling = () => {
    const { _id, users } = useSelector((state) => state.calling);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    const handleClickOutside = useCallback(
        (handleCloseTrack) => () => {
            dispatch(resetCalling());
            socket.emit('endCall', { sender: user, _id });
            handleCloseTrack?.();
        },
        [_id, dispatch, socket, user],
    );

    const handleReject = useCallback(
        (onClose) => () => {
            socket.emit('rejectCall', {
                sender: user,
                _id,
            });
            dispatch(resetCalling());
            onClose();
        },
        [_id, dispatch, socket, user],
    );

    const handleAccept = useCallback(
        (onClose) => () => {
            socket.emit('acceptCall', {
                receiver: user,
                users,
                _id,
            });
            dispatch(acceptCall({ receiver: user, _id }));
            dispatch(setShowCalling());
            onClose();
        },
        [_id, dispatch, socket, user, users],
    );

    return {
        handleClickOutside,
        handleReject,
        handleAccept,
    };
};

export default useCalling;
