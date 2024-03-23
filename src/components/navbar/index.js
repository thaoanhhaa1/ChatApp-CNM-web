import Tippy from '@tippyjs/react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
    UserIcon,
} from '~/assets';
import images from '~/assets/images';
import config from '~/config';
import routes from '~/config/routes';
import logout from '~/services/logout';
import { classNames, token } from '~/utils';
import Avatar from '../avatar';
import Popup from '../popup';
import Button from './Button';

const navBars = [
    {
        title: 'navbar.profile',
        icon: UserIcon,
        to: routes.profile,
    },
    {
        title: 'navbar.chats',
        icon: MessageIcon,
        to: routes.chats,
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
    },
    {
        title: 'navbar.settings',
        icon: SettingIcon,
        to: routes.settings,
    },
];

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

const Navbar = ({ className }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();

    const actions = useMemo(
        () => [
            {
                title: 'navbar.profile',
                icon: ProfileIcon,
            },
            {
                title: 'navbar.settings',
                icon: SettingIcon,
                separate: true,
            },
            {
                title: 'navbar.logout',
                icon: LogOutIcon,
                onClick: () => {
                    logout().then();
                    token.set('');
                    navigate(config.routes.signIn);
                },
            },
        ],
        [navigate],
    );

    const toggleDarkMode = () => setDarkMode(!darkMode);

    useLayoutEffect(() => {
        html.classList[darkMode ? 'remove' : 'add']('dark');
    }, [darkMode]);

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
                        <Button {...navbar}>{t(title)}</Button>
                    </Tippy>
                ))}
            </div>
            <div className="flex-1 dl:flex-none flex dl:flex-col items-center gap-2.5 dl:pb-2">
                <Popup data={languages}>
                    <Button className="hidden dl:flex" icon={GlobalIcon} />
                </Popup>

                <Tippy delay={[200, 0]} offset={[0, 0]} placement="right" content="Dark / Light mode">
                    <Button onClick={toggleDarkMode} className="hidden dl:flex" icon={darkMode ? MoonIcon : SunIcon} />
                </Tippy>

                <Popup data={actions.map((action) => ({ ...action, title: t(action.title) }))}>
                    <button className="w-12 h-12 flex justify-center items-center">
                        <Avatar src={user.avatar} />
                    </button>
                </Popup>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
