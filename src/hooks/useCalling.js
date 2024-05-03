import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptCall, cancelCall, resetCalling } from '~/features/calling/callingSlice';

const useCalling = () => {
    const { sender, _id, acceptUserIds, users } = useSelector((state) => state.calling);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    const handleClickOutside = useCallback(
        (onClickOutside, stream) => () => {
            onClickOutside();

            if ((user._id === sender?._id && !acceptUserIds.length) || users?.length === 2) {
                socket.emit('cancelCall', {
                    users,
                    sender,
                    _id,
                });
            }
            dispatch(resetCalling());

            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        },
        [acceptUserIds.length, _id, dispatch, sender, socket, user._id, users],
    );

    const handleReject = useCallback(
        (onClickOutside) => () => {
            if (users?.length === 2) {
                dispatch(cancelCall(_id));
                socket.emit('cancelCall', {
                    users,
                    sender,
                    _id,
                });
            } else {
                socket.emit('rejectCall', {
                    receiver: user,
                    sender,
                    _id,
                });
                dispatch(resetCalling());
            }

            onClickOutside();
        },
        [_id, dispatch, sender, socket, user, users],
    );

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
