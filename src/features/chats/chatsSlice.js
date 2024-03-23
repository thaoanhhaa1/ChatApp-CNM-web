import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: [
        {
            id: '1',
            user: {
                status: 'OFFLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
            unseenMessages: 1,
        },
        {
            id: '2',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: true,
            unseenMessages: 11,
        },
        {
            id: '3',
            user: {
                status: 'OFFLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: true,
            unseenMessages: 150,
        },
        {
            id: '4',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '5',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '6',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '7',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '8',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '9',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '10',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '11',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '12',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '13',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '14',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '15',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '16',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '17',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '18',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '19',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '20',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '21',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '22',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '23',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '24',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '25',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '26',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '27',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '28',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '29',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '30',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '31',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '32',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '33',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '34',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '35',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '36',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '37',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '38',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '39',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '40',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '41',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '42',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '43',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '44',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '45',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '46',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '47',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '48',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
        {
            id: '49',
            user: {
                status: 'ONLINE',
                avatar: 'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'Patrick Hendricks',
            },
            messages: [
                {
                    avatar: 'https://images.unsplash.com/photo-1705733282884-701c98680343?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:00:00',
                    id: 0,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:05:00',
                    id: 1,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:10:00',
                    id: 2,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:15:00',
                    id: 3,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:20:00',
                    id: 4,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:25:00',
                    id: 5,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:30:00',
                    id: 6,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2021-01-01 09:35:00',
                    id: 7,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'Jane Smith',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 8,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 9,
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
                    id: 10,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-18 09:35:00',
                    files: [{ name: 'Minible-Vertical.zip' }],
                    id: 11,
                },
                {
                    avatar: 'https://images.unsplash.com/photo-1705522409239-87c3c13496e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                    name: 'John Doe',
                    messages: [
                        { content: 'Jesse Pinkman', id: 'jesse', type: 'tag' },
                        { content: ' fdgfdgdfgdfgdfgdf', type: 'text' },
                    ],
                    date: '2024-01-19 09:40:00',
                    id: 12,
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
                    id: 13,
                },
            ],
            typing: false,
        },
    ],
    loading: false,
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setTyping: (state, { payload }) => {
            state.chats.find((chat) => {
                const find = chat.id === payload.id;

                if (find) {
                    chat.typing = payload.typing;
                }

                return find;
            });
        },
        setActive: (state, { payload }) => {
            state.active = payload;
        },
    },
});

export default chatsSlice.reducer;
export const { setTyping, setActive } = chatsSlice.actions;
