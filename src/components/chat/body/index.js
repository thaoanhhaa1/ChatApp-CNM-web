import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import ChatEmpty from './ChatEmpty';
import ChatItem from './ChatItem';

// TODO Typing
const Body = () => {
    const ref = useRef();
    const { messages } = useSelector((state) => state.messages);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        ref.current.scrollBottom();
    }, []);

    return (
        <ScrollbarCustomize containerClassName="overflow-hidden" ref={ref}>
            <div className="flex flex-col gap-6 p-2 sm:p-3 md:p-4 dl:p-5">
                {messages.length ? (
                    messages.map((chat, index, arr) => (
                        <ChatItem
                            scrollY={ref.current?.scrollY}
                            key={chat.id}
                            isMe={user.name === chat.name}
                            chat={chat}
                            nextChat={arr[index + 1]}
                        />
                    ))
                ) : (
                    <div className="absolute bottom-0 left-0 right-0">
                        <ChatEmpty className="mb-14 max-w-[472px] mx-auto mt-auto" />
                    </div>
                )}

                {/* <ChatItemTyping chat={user} /> */}
            </div>
        </ScrollbarCustomize>
    );
};

Body.propTypes = {};

export default memo(Body);
