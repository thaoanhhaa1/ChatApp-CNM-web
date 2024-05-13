import PropTypes from 'prop-types';
import NewWindow from 'react-new-window';
import { useSelector } from 'react-redux';
import { useCalling } from '~/hooks';
import CallingEmpty from './CallingEmpty';

const AudioCalling = ({ onClickOutside }) => {
    const { acceptUserIds } = useSelector((state) => state.calling);
    const { handleClickOutside } = useCalling();

    return (
        <NewWindow onUnload={handleClickOutside(onClickOutside)}>
            <div className="w-full h-full relative">{acceptUserIds.length ? <div></div> : <CallingEmpty />}</div>
        </NewWindow>
    );
};

AudioCalling.propTypes = {
    onClickOutside: PropTypes.func,
};

export default AudioCalling;
