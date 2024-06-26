import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '~/components/message';
import MessageSeparate from '~/components/message/MessageSeparate';
import MessageTyping from '~/components/message/MessageTyping';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { DeleteMessageStatus, sentMessageStatus } from '~/constants';
import { addMessageHead, addMessages } from '~/features/chats/chatsSlice';
import { getMessages, setLoading, setMessages } from '~/features/messages/messagesSlice';
import { getTimeChatSeparate } from '~/utils';
import ChatEmpty from './ChatEmpty';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const Body = () => {
    const ref = useRef();
    const { messages, loading, page, maxPage } = useSelector((state) => state.messages);
    const { active, activeLoading } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const messagesCanShow = useMemo(
        () => (messages || []).filter((message) => message.deleted !== DeleteMessageStatus.DELETE_FOR_ME),
        [messages],
    );
    const latestMessage = useMemo(() => messagesCanShow.at(-1), [messagesCanShow]);
    const typingUsers = useMemo(() => {
        if (!active) return [];

        return active.users.filter((u) => u.typing && u._id !== user._id);
    }, [active, user._id]);

    const scrollY = useCallback((y) => ref.current?.scrollY(y), [ref]);

    const handleScroll = async (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop !== 40 && scrollTop <= 200 && !loading && page < maxPage && active?._id) {
            const data = await dispatch(
                getMessages({ param: [active._id], query: { messageId: messages?.at(-1)?._id } }),
            ).unwrap();
            if (data?.length) ref.current.scrollY(205);
        }
    };

    useEffect(() => {
        let controller;

        const fetchMessages = async () => {
            try {
                controller = new AbortController();
                const messages = await dispatch(
                    getMessages({
                        param: [active._id],
                        signal: controller.signal,
                    }),
                ).unwrap();

                dispatch(addMessages(messages));
            } catch (error) {
                if (error?.code === 'ERR_CANCELED') dispatch(setLoading(true));
            }
        };

        if (active?._id && !messages?.length) {
            if (active?.firstFetchMessages) dispatch(setMessages(active.messages));
            else fetchMessages();
        }

        return () => {
            controller && controller.abort();
        };
    }, [active?._id, active?.firstFetchMessages, active?.messages, dispatch, messages?.length]);

    useEffect(() => {
        ref.current.scrollBottom();
    }, [messages.length]);

    useEffect(() => {
        const message = messages?.[0];

        if (!message) return;

        if (message.state === sentMessageStatus.SENT) {
            dispatch(
                addMessageHead({
                    myId: user._id,
                    ...message,
                }),
            );
        }
    }, [dispatch, messages, user._id]);

    return (
        <ScrollbarCustomize containerClassName="overflow-hidden" ref={ref} onScroll={handleScroll}>
            <div className="flex flex-col-reverse gap-6 p-2 sm:p-3 md:p-4 dl:p-5">
                {typingUsers.map((user) => (
                    <MessageTyping key={user._id} chat={user} />
                ))}

                {loading || activeLoading || !!messages?.length || (
                    <div className="absolute bottom-0 left-0 right-0 px-2 sm:px-3 md:px-4 dl:px-5">
                        <ChatEmpty className="mb-6 ex:mb-8 sm:mb-10 md:mb-12 dl:mb-14 max-w-[472px] mx-auto" />
                    </div>
                )}

                {!activeLoading &&
                    messagesCanShow.length > 0 &&
                    messagesCanShow.map((chat, index, arr) => (
                        <Message scrollY={scrollY} key={chat._id} chat={chat} prevChat={arr[index - 1]} />
                    ))}

                {messagesCanShow.length > 0 && (
                    <MessageSeparate>
                        {getTimeChatSeparate(new Date(latestMessage.updatedAt || latestMessage.timeSend))}
                    </MessageSeparate>
                )}

                {(loading || activeLoading) && (
                    <div className="flex justify-center mb-4">
                        <span className="w-6 h-6 rounded-full border-2 border-primary-color border-t-transparent animate-spin"></span>
                    </div>
                )}
            </div>
        </ScrollbarCustomize>
    );
};

Body.propTypes = {};

// export default memo(Body);
export default withErrorBoundary(memo(Body), {
    fallback: null,
    onError: (error, info) => {
        toast.error('Body::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
