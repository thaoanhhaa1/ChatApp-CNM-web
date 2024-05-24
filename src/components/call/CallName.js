import PropTypes from 'prop-types';
import { MicStopIcon } from '~/assets';

const CallName = ({ name, audio }) => {
    return (
        <div className="absolute left-0 bottom-0 flex bg-black bg-opacity-50 text-white">
            <samp className="text-sm px-1">{name}</samp>
            {audio || (
                <span className="h-5 w-5 flex justify-center items-center">
                    <MicStopIcon className="w-4 h-4" />
                </span>
            )}
        </div>
    );
};

CallName.propTypes = {
    name: PropTypes.string.isRequired,
    audio: PropTypes.bool,
};

export default CallName;
