import Tippy from '@tippyjs/react';
import { useWindowSize } from '@uidotdev/usehooks';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import {
    ArchiveIcon,
    ChevronDownIcon,
    DeleteIcon,
    MoreFillIcon,
    MuteIcon,
    PhoneLineIcon,
    RecordCircleFillIcon,
    SearchIcon,
    UserIcon,
    VideoLineIcon,
} from '~/assets';
import Call from '~/components/call';
import ConversationAvatar from '~/components/conversationAvatar';
import Input from '~/components/input';
import Popup from '~/components/popup';
import { callType, screens } from '~/constants';
import { useChat, useLayout } from '~/context';
import {
    setCalling,
    setHideAudioCalling,
    setHideVideoCalling,
    setShowAudioCalling,
    setShowVideoCalling,
} from '~/features/calling/callingSlice';
import { useBoolean } from '~/hooks';
import { getNameConversation, isOnlineConversation } from '~/utils';
import Button from './Button';

const tippyProps = {
    role: 'popup',
    interactive: true,
    placement: 'bottom-end',
    trigger: 'click',
    arrow: false,
    animation: 'shift-toward',
    offset: [0, 0],
    className: 'border border-[#f0eff5] dark:border-dark-separate shadow-popup py-1 bg-white dark:bg-dark-popup-bg',
};

const Header = () => {
    const { t } = useTranslation();
    const { value: showCall, setTrue: setShowCall, setFalse: setHideCall } = useBoolean(false);
    const { value: showVideo, setTrue: setShowVideo, setFalse: setHideVideo } = useBoolean(false);
    const { setShowChat } = useLayout();
    const { handleShowProfile } = useChat();
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { users } = useSelector((state) => state.onlineUsers);
    const { socket } = useSelector((state) => state.socket);
    const calling = useSelector((state) => state.calling);
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const conversationName = useMemo(() => getNameConversation(active, user._id), [active, user._id]);
    const onlineStatus = useMemo(
        () => isOnlineConversation({ users: active?.users, onlineUserIds: users }),
        [active?.users, users],
    );
    const more = useMemo(() => {
        const more = [];

        if (width < screens.DL)
            more.push({
                icon: UserIcon,
                title: t('chat.profile'),
                onClick: handleShowProfile,
            });

        return [
            ...more,
            {
                icon: ArchiveIcon,
                title: t('chat.archive'),
            },
            {
                icon: MuteIcon,
                title: t('chat.muted'),
            },
            {
                icon: DeleteIcon,
                title: t('chat.delete'),
            },
        ];
    }, [handleShowProfile, t, width]);

    const handleAcceptCall = (type) => {
        console.log('🚀 ~ handleAcceptCall ~ type:', type);
        const _id = v4();
        socket.emit('call', { type, users: active.users, sender: user, _id });
        if (type === callType.AUDIO) dispatch(setShowAudioCalling());
        else dispatch(setShowVideoCalling());
        setHideCall();
        setHideVideo();
        dispatch(setCalling({ _id, users: active.users, type, sender: user }));
    };

    useEffect(() => {
        if (!calling._id) {
            dispatch(setHideAudioCalling());
            dispatch(setHideVideoCalling());
        }
    }, [calling, calling._id, dispatch]);

    return (
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 dl:p-5 border-b border-separate dark:border-dark-separate">
            <div className="flex gap-2 sm:gap-4 items-center">
                <button
                    onClick={() => setShowChat(false)}
                    className="rotate-90 w-9 h-9 flex dl:hidden justify-center items-center -mr-2 text-secondary"
                >
                    <ChevronDownIcon className="w-4 h-4" />
                </button>
                <ConversationAvatar conversation={active} />
                <Link to="/" className="text-base font-semibold line-clamp-1">
                    {conversationName}
                </Link>
                {onlineStatus && (
                    <RecordCircleFillIcon className="flex-shrink-0 -ml-1 sm:-ml-2 w-2.5 h-2.5 text-success" />
                )}
            </div>
            <div className="flex gap-2">
                <div>
                    <Tippy
                        {...tippyProps}
                        content={<Input containerClassName="w-[238px]" placeholder={t('chat.search')} />}
                    >
                        <Button icon={SearchIcon} />
                    </Tippy>
                </div>

                <div className="dl:flex gap-2 hidden">
                    <div>
                        <Button icon={PhoneLineIcon} onClick={setShowCall} />
                        <Call
                            users={active?.users}
                            onAccept={() => handleAcceptCall(callType.AUDIO)}
                            onCancel={setHideCall}
                            show={showCall}
                        />
                    </div>

                    <div>
                        <Button icon={VideoLineIcon} onClick={setShowVideo} />
                        <Call
                            users={active?.users}
                            onAccept={() => handleAcceptCall(callType.VIDEO)}
                            onCancel={setHideVideo}
                            show={showVideo}
                            isVideoCall
                        />
                    </div>

                    <Button onClick={handleShowProfile} icon={UserIcon} />
                </div>

                <Popup data={more} animation="shift-toward" placement="bottom-end">
                    <Button icon={MoreFillIcon} />
                </Popup>
            </div>
        </div>
    );
};

export default memo(Header);
