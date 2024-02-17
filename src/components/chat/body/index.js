import ScrollbarCustomize from '~/components/scrollbarCustomize';
import ChatItem from './ChatItem';
import ChatItemTyping from './ChatItemTyping';
import { useEffect, useRef } from 'react';

const chats = [
    {
        avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:00:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
        name: 'Jane Smith',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:05:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:10:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'Jane Smith',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:15:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:20:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'Jane Smith',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:25:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:30:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'Jane Smith',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2021-01-01 09:35:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'Jane Smith',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2024-01-18 09:35:00',
        files: [
            {
                name: 'Minible-Vertical.zip',
            },
        ],
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2024-01-18 09:35:00',
        files: [
            {
                name: 'Minible-Vertical.zip',
            },
        ],
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2024-01-18 09:35:00',
        images: [
            'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2024-01-18 09:35:00',
        files: [
            {
                name: 'Minible-Vertical.zip',
            },
        ],
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'John Doe',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        date: '2024-01-19 09:40:00',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
        name: 'Jane Smith',
        messages: [
            { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
            { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
        ],
        images: [
            'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1705003210596-dcff04d0fa5a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
        date: '2024-01-20 09:45:00',
    },
];

const Body = () => {
    const ref = useRef();

    const user = {
        name: 'John Doe',
    };

    useEffect(() => {
        ref.current.scrollBottom();
    }, []);

    return (
        <ScrollbarCustomize containerClassName="overflow-hidden" ref={ref}>
            <div className="flex flex-col gap-6 p-2 sm:p-3 md:p-4 dl:p-5">
                {chats.map((chat, index, arr) => (
                    <ChatItem key={index} isMe={user.name === chat.name} chat={chat} nextChat={arr[index + 1]} />
                ))}
                <ChatItemTyping
                    chat={{
                        avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                        name: 'Jane Smith',
                    }}
                />
            </div>
        </ScrollbarCustomize>
    );
};

Body.propTypes = {};

export default Body;
