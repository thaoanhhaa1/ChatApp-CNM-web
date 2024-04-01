import PropTypes from 'prop-types';
import { useEffect, useRef, useState, useTransition } from 'react';
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
import { getReplyMessages, setOffsetTop } from '~/features/messages/messagesSlice';
import { classNames, getTimeChat, getTimeChatSeparate, isShowTimeChatSeparate } from '~/utils';
import ChatImage from './ChatImage';
import ChatItemButton from './ChatItemButton';
import ChatItemReaction from './ChatItemReaction';
import ChatItemSeparate from './ChatItemSeparate';
import Reaction from './ReactionChat';

const ChatItem = ({ isMe, chat, prevChat, scrollY = () => {} }) => {
    const [, startTransition] = useTransition();
    const { t } = useTranslation();
    const [react, setReact] = useState('haha');
    const ref = useRef();
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.messages);

    const isYourPrev = prevChat?.sender._id === chat.sender._id;
    const date = new Date(chat.updatedAt || chat.timeSend);
    const prevDate = prevChat && new Date(prevChat.updatedAt || prevChat.timeSend);
    const showSeparate = prevDate && isShowTimeChatSeparate(date, prevDate);
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

    const handleClickReply = (message) => {
        const mess = messages.find((mess) => mess._id === message._id);

        if (mess) scrollY(mess.offsetTop);
        else {
            scrollY(0);

            startTransition(async () => {
                await dispatch(getReplyMessages(message._id)).unwrap();
                scrollY(0);
            });
        }
    };
    const handleReply = () => dispatch(setReply(chat));

    useEffect(() => {
        dispatch(
            setOffsetTop({
                _id: chat._id,
                offsetTop: ref.current.offsetTop,
            }),
        );
    }, [chat._id, dispatch]);

    return (
        <div ref={ref} className="flex flex-col gap-2 ex:gap-3 sm:gap-4">
            <div
                className={classNames(
                    'max-w-[90%] ex:max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] flex',
                    isMe && 'flex-row-reverse ml-auto',
                )}
            >
                <Avatar
                    containerClassName={classNames(
                        'flex-shrink-0 self-end',
                        !showSeparate && isYourPrev && 'opacity-0',
                    )}
                    src={chat.sender.avatar}
                />
                <div className={isMe ? 'ml-1 mr-2 sm:mr-4' : 'ml-2 sm:ml-4 mr-1'}>
                    {chat.messages.length > 0 ? (
                        <>
                            <div
                                className={classNames(
                                    'relative w-fit flex flex-col gap-1 px-2 dl:px-5 py-1 dl:py-3 rounded-t-lg',
                                    isMe
                                        ? 'rounded-l-lg bg-sidebar-sub-bg dark:bg-dark-sidebar-bg'
                                        : 'rounded-r-lg bg-primary-color bg-opacity-40',
                                )}
                            >
                                {chat.reply ? (
                                    <ReplyMessage isMe={isMe} onClick={handleClickReply} message={chat.reply} />
                                ) : null}

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
                                    <span>{getTimeChat(chat.updatedAt || new Date(chat.timeSend))}</span>
                                </div>

                                {chat.sticker ? null : (
                                    <ChatItemReaction
                                        reacts={reacts}
                                        react={react}
                                        className="absolute right-0 bottom-0 translate-y-[calc(100%-7px)]"
                                    />
                                )}
                            </div>
                            <div
                                className={classNames(
                                    'border-5 w-0',
                                    isMe
                                        ? 'border-sidebar-sub-bg dark:border-dark-sidebar-bg ml-auto border-b-transparent border-l-transparent dark:border-b-transparent dark:border-l-transparent'
                                        : 'border-primary-color border-opacity-40 border-r-transparent border-b-transparent',
                                )}
                            />
                            {isYourPrev || (
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
                    ) : (
                        <StickerItem className="w-[130px] h-[130px]" count={5} url={chat.sticker} />
                    )}
                </div>
                <div className={classNames('flex', isMe && 'flex-row-reverse')}>
                    <ChatItemButton onClick={handleReply}>
                        <QuoteRightIcon className="w-[14px] h-[14px]" />
                    </ChatItemButton>
                    {chat.sticker ? null : <Reaction setReact={setReact} react={react} />}
                    <Popup data={mores} animation="shift-toward" placement={isMe ? 'bottom-end' : 'bottom-start'}>
                        <ChatItemButton>
                            <MoreFillIcon className="w-[15px] h-[15px] rotate-90" />
                        </ChatItemButton>
                    </Popup>
                </div>
            </div>
            {showSeparate && <ChatItemSeparate>{getTimeChatSeparate(prevDate)}</ChatItemSeparate>}
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
