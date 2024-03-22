import { Cake2LineIcon, ContactBook3LineIcon, GroupIcon } from '~/assets';

const FRIEND_REQUEST = 1;
const PHONE_BOOK = 2;
const BIRTHDAY_CALENDAR = 3;

const actions = [
    {
        id: FRIEND_REQUEST,
        Icon: GroupIcon,
        title: 'contacts.friendRequest',
    },
    {
        id: PHONE_BOOK,
        Icon: ContactBook3LineIcon,
        title: 'contacts.directory',
        description: 'contacts.user-may-use',
    },
    {
        id: BIRTHDAY_CALENDAR,
        Icon: Cake2LineIcon,
        title: 'contacts.birthday-calender',
        description: 'contacts.follow-friend-birthday',
    },
];

export default actions;
export { BIRTHDAY_CALENDAR, FRIEND_REQUEST, PHONE_BOOK };
