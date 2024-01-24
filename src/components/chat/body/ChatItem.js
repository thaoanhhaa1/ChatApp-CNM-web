import PropTypes from 'prop-types';
import { ChatForwardIcon, ClockIcon, DeleteBinLineIcon, FileCopyIcon, MoreFillIcon, SaveLineIcon } from '~/assets';
import AttachedFile from '~/components/attachedFile';
import Avatar from '~/components/avatar';
import Popup from '~/components/popup';
import { classNames, getTimeChatSeparate, isShowTimeChatSeparate } from '~/utils';
import ChatImage from './ChatImage';
import ChatItemSeparate from './ChatItemSeparate';
import { useTranslation } from 'react-i18next';

const ChatItem = ({ isMe, chat, nextChat }) => {
    const { t } = useTranslation();
    const isYourNext = nextChat?.name === chat.name;
    const date = new Date(chat.date);
    const nextDate = nextChat && new Date(nextChat.date);
    const showSeparate = nextDate && isShowTimeChatSeparate(date, nextDate);

    const mores = [
        {
            icon: FileCopyIcon,
            title: t('chat.more.copy'),
        },
        {
            icon: SaveLineIcon,
            title: t('chat.more.save'),
        },
        {
            icon: ChatForwardIcon,
            title: t('chat.more.forward'),
        },
        {
            icon: DeleteBinLineIcon,
            title: t('chat.more.delete'),
        },
    ];

    return (
        <div>
            <div
                className={classNames(
                    'max-w-[90%] ex:max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] flex',
                    isMe && 'flex-row-reverse ml-auto',
                )}
            >
                <Avatar
                    containerClassName={classNames(
                        'flex-shrink-0 self-end',
                        !showSeparate && isYourNext && 'opacity-0',
                    )}
                    src={chat.avatar}
                />
                <div className={isMe ? 'ml-1 mr-2 sm:mr-4' : 'ml-2 sm:ml-4 mr-1'}>
                    <div
                        className={classNames(
                            'w-fit flex flex-col gap-1 px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg',
                            isMe
                                ? 'rounded-l-lg bg-sidebar-sub-bg dark:bg-dark-sidebar-bg'
                                : 'rounded-r-lg bg-primary-color',
                        )}
                    >
                        <p
                            className={classNames(
                                'text-mm',
                                isMe ? 'text-primary dark:text-dark-primary' : 'text-white',
                            )}
                        >
                            {chat.message}
                        </p>

                        {chat.images && (
                            <div className="flex gap-1 px-1 flex-col ex:flex-row flex-wrap">
                                {chat.images.map((image, index) => (
                                    <ChatImage src={image} key={index} />
                                ))}
                            </div>
                        )}

                        {chat.files && chat.files.map((file, index) => <AttachedFile file={file} key={index} />)}

                        <div
                            className={classNames(
                                'flex items-center text-xs',
                                isMe
                                    ? 'text-secondary dark:text-dark-secondary'
                                    : 'text-white text-opacity-50 justify-end',
                            )}
                        >
                            <ClockIcon className="mr-1" />
                            <span>10:31</span>
                        </div>
                    </div>
                    <div
                        className={classNames(
                            'border-5 w-0',
                            isMe
                                ? 'border-sidebar-sub-bg dark:border-dark-sidebar-bg ml-auto border-b-transparent border-l-transparent dark:border-b-transparent dark:border-l-transparent'
                                : 'border-primary-color border-r-transparent border-b-transparent',
                        )}
                    />
                    {isYourNext || (
                        <div
                            className={classNames(
                                'text-sm font-medium dark:text-[rgb(166,176,207)]',
                                isMe && 'text-right',
                            )}
                        >
                            {chat.name}
                        </div>
                    )}
                </div>
                <Popup data={mores} animation="shift-toward" placement={isMe ? 'bottom-end' : 'bottom-start'}>
                    <span className="cursor-pointer h-fit mt-1 dark:text-dark-secondary">
                        <MoreFillIcon className="w-[15px] h-[15px] rotate-90" />
                    </span>
                </Popup>
            </div>
            {nextDate && showSeparate && <ChatItemSeparate>{getTimeChatSeparate(nextDate)}</ChatItemSeparate>}
        </div>
    );
};

ChatItem.propTypes = {
    isMe: PropTypes.bool.isRequired,
    chat: PropTypes.object.isRequired,
    nextChat: PropTypes.object,
};

export default ChatItem;
