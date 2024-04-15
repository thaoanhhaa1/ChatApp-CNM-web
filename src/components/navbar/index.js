import Tippy from '@tippyjs/react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {
    ClockIcon,
    ContactIcon,
    GlobalIcon,
    LogOutIcon,
    LogoIcon,
    MessageIcon,
    MoonIcon,
    ProfileIcon,
    SettingIcon,
    SunIcon,
} from '~/assets';
import images from '~/assets/images';
import config from '~/config';
import routes from '~/config/routes';
import {reset as resetChat} from '~/features/chat/chatSlice';
import {reset as resetChats} from '~/features/chats/chatsSlice';
import {reset as resetContactGroups} from '~/features/contactGroups/contactGroupsSlice';
import {reset as resetCreateGroup} from '~/features/createGroup/createGroupSlice';
import {reset as resetFriend} from '~/features/friend/friendSlice';
import {reset as resetLocalSettings, setSetting} from '~/features/localSetting/localSettingSlice';
import {reset as resetLocation} from '~/features/location/locationSlice';
import {reset as resetMessages} from '~/features/messages/messagesSlice';
import {reset as resetSearch} from '~/features/search/searchSlice';
import {disconnect} from '~/features/socket/socketSlice';
import {remove as resetUser} from '~/features/user/userSlice';
import {Profile, Setting} from '~/pages';
import authServices from '~/services/auth.service';
import {classNames, token} from '~/utils';
import Avatar from '../avatar';
import Popup from '../popup';
import Button from './Button';

const languages = [
    {
        url: images.americaFlag,
        title: 'English',
        onClick: () => i18next.changeLanguage('en').then(),
    },
    {
        url: images.vietnamFlag,
        title: 'Tiếng Việt',
        onClick: () => i18next.changeLanguage('vn').then(),
    },
];

const html = document.querySelector('html');

// TODO Profile, Setting navigation
const Navbar = ({ className }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const { settings } = useSelector((state) => state.localSetting);
    const { hasNewReceived } = useSelector((state) => state.friend);
    const [darkMode, setDarkMode] = useState(() => settings.theme === 'dark');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(false);
    const { chats } = useSelector((state) => state.chats);
    const countMessagesUnseen = useMemo(
        () => chats.reduce((acc, chat) => acc + (chat.unseenMessages || 0), 0),
        [chats],
    );

    const handleCloseProfile = () => {
        setOpenProfileModal(false);
    };

    const handleCloseSetting = () => {
        setOpenSettingModal(false);
    };

    const handleResetRedux = useCallback(() => {
        dispatch(resetLocalSettings());
        dispatch(resetChat());
        dispatch(resetChats());
        dispatch(resetContactGroups());
        dispatch(resetCreateGroup());
        dispatch(resetFriend());
        dispatch(resetLocation());
        dispatch(resetMessages());
        dispatch(resetSearch());
        dispatch(resetUser());
        dispatch(disconnect());
    }, [dispatch]);

    const navBars = [
        // {
        //     title: 'navbar.profile',
        //     icon: UserIcon,
        //     to: routes.profile,
        // },
        {
            title: 'navbar.chats',
            icon: MessageIcon,
            to: routes.chats,
            badge: countMessagesUnseen,
        },
        {
            title: 'navbar.groups',
            icon: ClockIcon,
            to: routes.feed,
        },
        {
            title: 'navbar.contacts',
            icon: ContactIcon,
            to: routes.contacts,
            badge: hasNewReceived ? 'N' : '',
        },
        // {
        //     title: 'navbar.settings',
        //     icon: SettingIcon,
        //     to: routes.settings,
        // },
    ];

    const actions = useMemo(
        () => [
            {
                title: 'navbar.profile',
                icon: ProfileIcon,
                onClick: () => {
                    setOpenProfileModal(true);
                },
            },
            {
                title: 'navbar.settings',
                icon: SettingIcon,
                separate: true,
                onClick: () => {
                    setOpenSettingModal(true);
                },
            },
            {
                title: 'navbar.logout',
                icon: LogOutIcon,
                onClick: () => {
                    authServices.logout().then();
                    token.set('');
                    html.classList.remove('dark');
                    handleResetRedux();
                    navigate(config.routes.signIn);
                },
            },
        ],
        [handleResetRedux, navigate],
    );

    const toggleDarkMode = () => setDarkMode(!darkMode);

    useLayoutEffect(() => {
        html.classList[darkMode ? 'add' : 'remove']('dark');
        dispatch(setSetting({ theme: darkMode ? 'dark' : 'light' }));
    }, [darkMode, dispatch]);

    return (
        <nav
            className={classNames(
                'border-t border-separate dark:border-dark-separate dl:border-0 p-[5px] dl:p-0 z-10 shadow-navbar dark:shadow-none sticky top-0 bottom-0 dl:w-[75px] dl:h-screen h-fit order-1 bg-white dark:bg-dark-sidebar-bg flex dl:flex-col justify-evenly dl:justify-between',
                className,
            )}
        >
            <Link className="hidden dl:flex justify-center items-center w-full h-[70px]">
                <LogoIcon />
            </Link>

            <div className="flex-5 dl:flex-none flex dl:flex-col justify-evenly dl:justify-start items-center ex:gap-2">
                {navBars.map(({ title, ...navbar }, index) => (
                    <Tippy delay={[200, 0]} offset={[0, 0]} content={t(title)} key={index}>
                        <div className="relative">
                            <Button {...navbar}>{t(title)}</Button>
                            {navbar.badge ? (
                                <span className="absolute min-w-4 text-center bg-danger top-2 right-2 rounded-full px-1 text-xs text-white">
                                    {navbar.badge}
                                </span>
                            ) : null}
                        </div>
                    </Tippy>
                ))}
            </div>
            <div className="flex-1 dl:flex-none flex dl:flex-col items-center gap-2.5 dl:pb-2">
                <Popup data={languages}>
                    <Button className="hidden dl:flex" icon={GlobalIcon} />
                </Popup>

                <Tippy delay={[200, 0]} offset={[0, 0]} placement="right" content="Dark / Light mode">
                    <Button onClick={toggleDarkMode} className="hidden dl:flex" icon={darkMode ? SunIcon : MoonIcon} />
                </Tippy>

                <Popup data={actions.map((action) => ({ ...action, title: t(action.title) }))}>
                    <button className="w-12 h-12 flex justify-center items-center">
                        <Avatar src={user.avatar} />
                    </button>
                </Popup>
                {openProfileModal && <Profile onClose={handleCloseProfile} />}

                {openSettingModal && <Setting onClose={handleCloseSetting} />}
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
