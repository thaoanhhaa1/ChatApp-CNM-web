import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ChatTextLineIcon, ChevronDownIcon, MoreFillIcon } from '~/assets';
import Message from '../message';
import Popup from '../popup';

const message = {
    location: null,
    _id: '6611223f8acfb025ab6df693',
    sender: {
        _id: 'thaoanhhaa1@gmail.com',
        name: 'Thao',
        avatar: 'https://res.cloudinary.com/dttv3mbki/image/upload/v1704809257/chat-app-cnm-DB/y9x5eessbbrewmffzrwv.png',
    },
    messages: [
        {
            content: '9',
            type: 'text',
            _id: '6611223f8acfb025ab6df694',
        },
    ],
    conversation: {
        _id: '660fa673359d29deb5153f8b',
        pinnedMessages: [
            {
                sender: {
                    _id: 'thaoanhhaa1@gmail.com',
                    name: 'Thao',
                },
                messages: [
                    {
                        content: '9',
                        type: 'text',
                        _id: '6611223f8acfb025ab6df694',
                    },
                ],
                files: [],
            },
        ],
    },
    files: [],
    reply: null,
    deleted: '0',
    statuses: [],
    createdAt: '2024-04-06T10:21:51.103Z',
    updatedAt: '2024-04-06T10:21:51.103Z',
    __v: 0,
};

const PinMessage = ({ pinCount }) => {
    const { t } = useTranslation();

    const more = [
        {
            title: t('chat.pin-more.copy'),
            separator: true,
        },
        {
            title: t('chat.pin-more.unpin'),
        },
    ];

    return (
        <div className="group/pin flex px-4 items-center gap-3 h-[50px] cursor-pointer">
            <ChatTextLineIcon className="w-6 h-6 text-primary-color" />
            <div className="flex-1">
                <h5 className="text-ss">Message</h5>
                <Message className="!text-secondary dark:!text-dark-secondary" messages={message.messages} />
            </div>
            <Popup data={more} placement="bottom-end">
                <span className="group-hover/pin:opacity-100 opacity-0 transition-all duration-150 flex justify-center items-center w-8 h-8 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 rounded-full">
                    <MoreFillIcon className="w-5 h-5" />
                </span>
            </Popup>
            {pinCount > 1 ? (
                <div className="border border-primary-color rounded-lg flex items-center gap-1 h-6 px-4 text-sm text-primary-color font-medium hover:bg-primary-color hover:bg-opacity-5 transition-all duration-150">
                    <span>1</span>
                    <span>more</span>
                    <ChevronDownIcon className="w-4 h-4" />
                </div>
            ) : null}
        </div>
    );
};

PinMessage.propTypes = {
    pinCount: PropTypes.number,
};

export default PinMessage;
