import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    ChatForwardIcon,
    ClockIcon,
    DeleteBinLineIcon,
    FileCopyIcon,
    MoreFillIcon,
    QuoteRightIcon,
    SaveLineIcon,
} from '~/assets';
import AttachedFile from '~/components/attachedFile';
import Avatar from '~/components/avatar';
import Message from '~/components/message';
import Popup from '~/components/popup';
import ReplyMessage from '~/components/replyMessage';
import StickerItem from '~/components/sticker/StickerItem';
import { setReply } from '~/features/chat/chatSlice';
import { setOffsetTop } from '~/features/messages/messagesSlice';
import { classNames, getTimeChatSeparate, isShowTimeChatSeparate } from '~/utils';
import ChatImage from './ChatImage';
import ChatItemButton from './ChatItemButton';
import ChatItemReaction from './ChatItemReaction';
import ChatItemSeparate from './ChatItemSeparate';
import Reaction from './ReactionChat';

const ChatItem = ({ isMe, chat, nextChat, scrollY = () => {} }) => {
    const { t } = useTranslation();
    const [react, setReact] = useState('haha');
    const ref = useRef();
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.messages);

    const isYourNext = nextChat?.name === chat.name;
    const date = new Date(chat.date);
    const nextDate = nextChat && new Date(nextChat.date);
    const showSeparate = nextDate && isShowTimeChatSeparate(date, nextDate);
    const reacts = ['love'];

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

    const handleClickReply = (message) => messages.forEach((mess) => mess.id === message.id && scrollY(mess.offsetTop));
    const handleReply = () => dispatch(setReply(chat));

    useEffect(() => {
        dispatch(
            setOffsetTop({
                id: chat.id,
                offsetTop: ref.current.offsetTop,
            }),
        );
    }, [chat.id, dispatch]);

    return (
        <div ref={ref}>
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
                    {(chat.messages && (
                        <>
                            <div
                                className={classNames(
                                    'relative w-fit flex flex-col gap-1 px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg',
                                    isMe
                                        ? 'rounded-l-lg bg-sidebar-sub-bg dark:bg-dark-sidebar-bg'
                                        : 'rounded-r-lg bg-primary-color bg-opacity-40',
                                )}
                            >
                                <ReplyMessage
                                    isMe={isMe}
                                    onClick={handleClickReply}
                                    message={{
                                        avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                                        name: 'John Doe',
                                        messages: [
                                            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                                            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                                        ],
                                        date: '2021-01-01 09:00:00',
                                        id: 0,
                                    }}
                                />

                                <Message messages={chat.messages} isMe={isMe} />

                                {chat.images && (
                                    <div className="flex gap-1 px-1 flex-col ex:flex-row flex-wrap">
                                        {chat.images.map((image, index) => (
                                            <ChatImage src={image} key={index} />
                                        ))}
                                    </div>
                                )}

                                {chat.files &&
                                    chat.files.map((file, index) => <AttachedFile file={file} key={index} />)}

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

                                <ChatItemReaction
                                    reacts={reacts}
                                    react={react}
                                    className="absolute right-0 bottom-0 translate-y-[calc(100%-7px)]"
                                />
                            </div>
                            <div
                                className={classNames(
                                    'border-5 w-0',
                                    isMe
                                        ? 'border-sidebar-sub-bg dark:border-dark-sidebar-bg ml-auto border-b-transparent border-l-transparent dark:border-b-transparent dark:border-l-transparent'
                                        : 'border-primary-color border-opacity-40 border-r-transparent border-b-transparent',
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
                        </>
                    )) || <StickerItem className="w-[130px] h-[130px]" count={5} url={chat.sticker} />}
                </div>
                <div className={classNames('flex', isMe && 'flex-row-reverse')}>
                    <ChatItemButton onClick={handleReply}>
                        <QuoteRightIcon className="w-[14px] h-[14px]" />
                    </ChatItemButton>
                    {chat.messages ? <Reaction setReact={setReact} react={react} /> : null}
                    <Popup data={mores} animation="shift-toward" placement={isMe ? 'bottom-end' : 'bottom-start'}>
                        <ChatItemButton>
                            <MoreFillIcon className="w-[15px] h-[15px] rotate-90" />
                        </ChatItemButton>
                    </Popup>
                </div>
            </div>
            {nextDate && showSeparate && <ChatItemSeparate>{getTimeChatSeparate(nextDate)}</ChatItemSeparate>}
        </div>
    );
};

ChatItem.propTypes = {
    isMe: PropTypes.bool.isRequired,
    chat: PropTypes.object.isRequired,
    nextChat: PropTypes.object,
    scrollY: PropTypes.func,
};

export default ChatItem;
