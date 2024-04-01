import { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { updateLastMessage } from '~/features/chats/chatsSlice';
import { getMessages } from '~/features/messages/messagesSlice';
import { getTimeChatSeparate } from '~/utils';
import ChatEmpty from './ChatEmpty';
import ChatItem from './ChatItem';
import ChatItemSeparate from './ChatItemSeparate';

// TODO Typing
const Body = () => {
    const ref = useRef();
    const { messages, loading, page } = useSelector((state) => state.messages);
    const { active } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const scrollY = useCallback((y) => ref.current?.scrollY(y), [ref]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                await dispatch(getMessages({ conversationId: active._id })).unwrap();
            } catch (error) {
                console.log(error);
            }
        };

        fetchMessages();
    }, [active._id, dispatch]);

    useEffect(() => {
        if (ref.current && page === 1) ref.current.scrollBottom();
    }, [messages, page]);

    useEffect(() => {
        const message = messages[0];

        if (!message) return;

        dispatch(
            updateLastMessage({
                conversationId: active._id,
                message: message,
            }),
        );
    }, [active._id, dispatch, messages]);

    return (
        <ScrollbarCustomize containerClassName="overflow-hidden" ref={ref}>
            <div className="flex flex-col-reverse gap-6 p-2 sm:p-3 md:p-4 dl:p-5">
                {loading || !!messages.length || (
                    <div className="absolute bottom-0 left-0 right-0 px-2 sm:px-3 md:px-4 dl:px-5">
                        <ChatEmpty className="mb-6 ex:mb-8 sm:mb-10 md:mb-12 dl:mb-14 max-w-[472px] mx-auto" />
                    </div>
                )}

                {messages.length > 0 &&
                    messages.map((chat, index, arr) => (
                        <ChatItem
                            scrollY={scrollY}
                            key={chat._id}
                            isMe={user._id === chat.sender._id}
                            chat={chat}
                            prevChat={arr[index - 1]}
                        />
                    ))}

                {messages.length > 0 && (
                    <ChatItemSeparate>
                        {getTimeChatSeparate(new Date(messages.at(-1).updatedAt || messages.at(-1).timeSend))}
                    </ChatItemSeparate>
                )}

                {loading && (
                    <div className="flex justify-center mb-4">
                        <span className="w-6 h-6 rounded-full border-2 border-primary-color border-t-transparent animate-spin"></span>
                    </div>
                )}

                {/* <ChatItemTyping chat={user} /> */}
            </div>
        </ScrollbarCustomize>
    );
};

Body.propTypes = {};

export default memo(Body);
