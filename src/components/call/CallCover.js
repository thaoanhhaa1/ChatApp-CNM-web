import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifiedUserIds } from '~/features/calling/callingSlice';
import Avatar from '../avatar';

const CallCover = ({ user }) => {
    const { t } = useTranslation();
    const { rejectUserIds, endedUserIds, acceptUserIds, busyUserIds, missedUserIds, _id } = useSelector(
        (state) => state.calling,
    );
    const dispatch = useDispatch();
    const { title, color } = useMemo(() => {
        if (acceptUserIds.includes(user._id)) return {};

        if (endedUserIds.includes(user._id))
            return {
                title: t('call.left'),
                color: 'text-danger',
            };

        if (rejectUserIds.includes(user._id))
            return {
                title: t('call.rejected'),
                color: 'text-danger',
            };

        if (busyUserIds.includes(user._id))
            return {
                title: t('call.busy'),
                color: 'text-danger',
            };

        if (missedUserIds.includes(user._id))
            return {
                title: t('call.missed'),
                color: 'text-danger',
            };

        return {
            title: t('call.connecting'),
            color: 'text-white',
        };
    }, [acceptUserIds, busyUserIds, endedUserIds, rejectUserIds, missedUserIds, t, user._id]);

    useEffect(() => {
        let id = setTimeout(() => {
            dispatch(
                setNotifiedUserIds({
                    _id,
                    notifiedUserIds: [...rejectUserIds, ...endedUserIds, ...busyUserIds, ...missedUserIds],
                }),
            );
        }, [2000]);

        return () => clearTimeout(id);
    }, [rejectUserIds, endedUserIds, busyUserIds, dispatch, _id, missedUserIds]);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
                <div
                    className="absolute inset-0 bg-cover bg-center blur-[8px] w-full h-full"
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
                    {title ? <span className={color}>{title}</span> : null}
                </div>
            </div>
        </div>
    );
};

CallCover.propTypes = {
    user: PropTypes.object.isRequired,
};

export default CallCover;
