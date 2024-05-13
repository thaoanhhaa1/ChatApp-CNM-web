import Peer from 'peerjs';

const peerOptions = {
    host: process.env.REACT_APP_PEER_HOST,
    port: process.env.REACT_APP_PEER_PORT,
    path: process.env.REACT_APP_PEER_PATH,
    key: process.env.REACT_APP_PEER_KEY,
    secure: process.env.REACT_APP_PEER_SECURE,
};

const createPeer = () => {
    const peer = new Peer(peerOptions);

    return peer;
};

export default createPeer;
