import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const initialState = {};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connect: (state) => {
            const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);

            state.socket = socket;
        },
        disconnect: (state) => {
            state.socket?.disconnect();
            state.socket = null;
        },
    },
});

export default socketSlice.reducer;
export const { connect, disconnect } = socketSlice.actions;
