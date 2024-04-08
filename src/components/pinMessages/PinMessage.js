import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ChatTextLineIcon, ChevronDownIcon, MoreFillIcon } from '~/assets';
import { removePinMessage } from '~/features/chats/chatsSlice';
import unpinMessage from '~/services/unpinMessage';
import { classNames } from '~/utils';
import Message from '../message';
import Popup from '../popup';

const PinMessage = ({ pinCount, message, onMore = () => {}, onClick = () => {} }) => {
    const { t } = useTranslation();
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    const handleUnpin = () => {
        unpinMessage(message._id).then();
        dispatch(removePinMessage({ conversationId: active._id, message: message }));
        socket.emit('pinMessage', { message, userId: user._id, users: active.users });
    };

    const more = [
        {
            title: t('chat.pin-more.copy'),
            separator: true,
        },
        {
            title: t('chat.pin-more.unpin'),
            onClick: handleUnpin,
        },
    ];

    const handleClickMore = (e) => {
        e.stopPropagation();
        onMore();
    };

    return (
        <div
            onClick={onClick}
            className={classNames(
                'group/pin flex px-4 items-center gap-3 h-[50px] cursor-pointer',
                Number.isInteger(pinCount) ||
                    'hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-150',
            )}
        >
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
                <div
                    onClick={handleClickMore}
                    className="border border-primary-color rounded-lg flex items-center gap-1 h-6 px-4 text-sm text-primary-color font-medium hover:bg-primary-color hover:bg-opacity-5 transition-all duration-150"
                >
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
    message: PropTypes.object.isRequired,
    onMore: PropTypes.func,
    onClick: PropTypes.func,
};

export default PinMessage;
