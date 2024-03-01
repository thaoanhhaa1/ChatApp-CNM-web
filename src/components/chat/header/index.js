import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
import Avatar from '~/components/avatar';
import Call from '~/components/call';
import Input from '~/components/input';
import Popup from '~/components/popup';
import { useChat, useLayout } from '~/context';
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
    const [showCall, setShowCall] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const { setShowChat } = useLayout();
    const { handleShowProfile } = useChat();
    const {
        active: { user },
    } = useSelector((state) => state.chats);

    const more = [
        {
            icon: UserIcon,
            title: t('chat.profile'),
            onClick: handleShowProfile,
        },
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

    return (
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 dl:p-5 border-b border-separate dark:border-dark-separate">
            <div className="flex gap-2 sm:gap-4 items-center">
                <button
                    onClick={() => setShowChat(false)}
                    className="rotate-90 w-9 h-9 flex dl:hidden justify-center items-center -mr-2 text-secondary"
                >
                    <ChevronDownIcon className="w-4 h-4" />
                </button>
                <Avatar containerClassName="flex-shrink-0" src={user.avatar} status={user.status} />
                <Link to="/" className="text-base font-semibold line-clamp-1">
                    {user.name}
                </Link>
                <RecordCircleFillIcon className="flex-shrink-0 -ml-1 sm:-ml-2 w-2.5 h-2.5 text-success" />
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
                        <Button icon={PhoneLineIcon} onClick={() => setShowCall(true)} />
                        <Call onAccept={() => {}} onCancel={() => setShowCall(false)} show={showCall} />
                    </div>

                    <div>
                        <Button icon={VideoLineIcon} onClick={() => setShowVideo(true)} />
                        <Call onAccept={() => {}} onCancel={() => setShowVideo(false)} show={showVideo} isVideoCall />
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

export default Header;
