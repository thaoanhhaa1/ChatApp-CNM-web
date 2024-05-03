import Peer from 'peerjs';

const peerOptions = {
    // DEV
    host: 'localhost',
    port: '4000',
    path: '/peerjs',
    key: 'peerjs',

    // PROD
    // host: 'homeless-eadith-vunguyendev.koyeb.app',
    // path: '/peerjs',
    // key: 'peerjs',
};

const createPeer = () => {
    const peer = new Peer(peerOptions);

    return peer;
};

export default createPeer;
