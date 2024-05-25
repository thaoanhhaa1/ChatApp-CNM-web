import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import NewWindow from 'react-new-window';
import { useCalling } from '~/hooks';
import Videos from './Videos';
import { toast } from 'react-toastify';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

const VideoCalling = () => {
    const { handleClickOutside } = useCalling();

    return (
        <NewWindow onUnload={handleClickOutside}>
            <AgoraRTCProvider client={client}>
                <Videos />
            </AgoraRTCProvider>
        </NewWindow>
    );
};

VideoCalling.propTypes = {
    onClickOutside: PropTypes.func,
};

export default withErrorBoundary(VideoCalling, {
    fallback: null,
    onError: (error, info) => {
        toast.error('VideoCalling::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
