import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptCall, resetCalling } from '~/features/calling/callingSlice';

const useCalling = () => {
    const { _id, users } = useSelector((state) => state.calling);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    const handleClickOutside = useCallback(
        (onClickOutside, stream) => () => {
            onClickOutside();

            socket.emit('endCall', {
                users,
                sender: user,
                _id,
            });
            dispatch(resetCalling());

            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        },
        [_id, dispatch, socket, user, users],
    );

    const handleReject = useCallback(() => {
        socket.emit('rejectCall', {
            users,
            sender: user,
            _id,
        });
        dispatch(resetCalling());
    }, [_id, dispatch, socket, user, users]);

    const handleAccept = useCallback(
        (onClose) => () => {
            socket.emit('acceptCall', {
                receiver: user,
                users,
                _id,
            });
            dispatch(acceptCall({ receiver: user, _id }));
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
