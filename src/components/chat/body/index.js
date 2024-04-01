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
    const { active, activeLoading } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const scrollY = useCallback((y) => ref.current?.scrollY(y), [ref]);

    const handleScroll = (e) => {
        const clientTop = e.target.clientTop;

        if (clientTop <= 200 && !loading) {
            console.group('handleScroll');
            console.log(`Load more message...`);
            console.log(`messages: ${messages}`);
            console.log(`loading: ${loading}`);
            console.log(`page: ${page}`);
            console.log(`active: ${active}`);
            console.log(`activeLoading: ${activeLoading}`);
            console.groupEnd();
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                await dispatch(getMessages({ conversationId: active._id })).unwrap();
            } catch (error) {
                console.log(error);
            }
        };

        if (active?._id) fetchMessages();
    }, [active?._id, dispatch]);

    useEffect(() => {
        if (ref.current && page === 1) ref.current.scrollBottom();
    }, [messages, page]);

    useEffect(() => {
        const message = messages[0];

        if (!message || activeLoading) return;

        const { _id } = active || {};
        if (!active || _id !== message.conversationId) return;

        dispatch(
            updateLastMessage({
                conversationId: _id,
                message: message,
            }),
        );
    }, [active, activeLoading, dispatch, messages]);

    return (
        <ScrollbarCustomize containerClassName="overflow-hidden" ref={ref} onScroll={handleScroll}>
            <div className="flex flex-col-reverse gap-6 p-2 sm:p-3 md:p-4 dl:p-5">
                {loading || activeLoading || !!messages.length || (
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

                {(loading || activeLoading) && (
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
