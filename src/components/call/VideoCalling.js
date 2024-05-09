import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import PropTypes from 'prop-types';
import NewWindow from 'react-new-window';
import { useCalling } from '~/hooks';
import Videos from './Videos';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

const VideoCalling = ({ onClickOutside }) => {
    const { handleClickOutside } = useCalling();

    return (
        <NewWindow onUnload={handleClickOutside(onClickOutside)}>
            <AgoraRTCProvider client={client}>
                <Videos />
            </AgoraRTCProvider>
        </NewWindow>
    );
};

VideoCalling.propTypes = {
    onClickOutside: PropTypes.func,
};

export default VideoCalling;
