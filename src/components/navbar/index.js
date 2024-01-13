import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import {
    ContactIcon,
    GlobalIcon,
    GroupIcon,
    LogOutIcon,
    LogoIcon,
    MessageIcon,
    MoonIcon,
    ProfileIcon,
    SettingIcon,
    UserIcon,
} from '~/assets';
import images from '~/assets/images';
import routes from '~/config/routes';
import Avatar from '../avatar';
import Popup from '../popup';
import Button from './Button';

const navBars = [
    {
        title: 'Chats',
        icon: MessageIcon,
        to: routes.chats,
    },
    {
        title: 'Profile',
        icon: UserIcon,
        to: routes.profile,
    },
    {
        title: 'Groups',
        icon: GroupIcon,
        to: routes.groups,
    },
    {
        title: 'Contacts',
        icon: ContactIcon,
        to: routes.contacts,
    },
    {
        title: 'Settings',
        icon: SettingIcon,
        to: routes.settings,
    },
];

const languages = [
    {
        url: images.americaFlag,
        title: 'English',
    },
    {
        url: images.spanishFlag,
        title: 'Spanish',
    },
    {
        url: images.germanFlag,
        title: 'German',
    },
    {
        url: images.italyFlag,
        title: 'Italian',
    },
    {
        url: images.russiaFlag,
        title: 'Russian',
    },
];

const actions = [
    {
        title: 'Profile',
        icon: ProfileIcon,
    },
    {
        title: 'Setting',
        icon: SettingIcon,
        separate: true,
    },
    {
        title: 'Log out',
        icon: LogOutIcon,
    },
];

const Navbar = () => {
    return (
        <nav className="shadow-navbar sticky top-0 bottom-0 dl:w-[75px] dl:h-screen h-fit order-1 bg-white flex dl:flex-col justify-evenly dl:justify-between">
            <Link className="hidden dl:flex justify-center items-center w-full h-[70px]">
                <LogoIcon />
            </Link>
            <div className="flex-5 dl:flex-none flex dl:flex-col justify-evenly dl:justify-start items-center gap-2">
                {navBars.map(({ title, ...navbar }, index) => (
                    <Tippy delay={[200, 0]} offset={[0, 0]} content={title} key={index}>
                        <Button {...navbar} />
                    </Tippy>
                ))}
            </div>
            <div className="flex-1 dl:flex-none flex dl:flex-col items-center gap-2.5 dl:pb-2">
                <Popup data={languages} popupClassName="top-0 left-0 -translate-y-full">
                    <Button className="hidden dl:flex" icon={GlobalIcon} />
                </Popup>

                <Tippy delay={[200, 0]} offset={[0, 0]} placement="right" content="Dark / Light mode">
                    <Button className="hidden dl:flex" icon={MoonIcon} />
                </Tippy>

                <Popup data={actions} popupClassName="top-0 right-0 dl:right-unset dl:left-0 -translate-y-full">
                    <Button>
                        <Avatar src="https://plus.unsplash.com/premium_photo-1682339458660-bc746ad86023?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    </Button>
                </Popup>
            </div>
        </nav>
    );
};

export default Navbar;
