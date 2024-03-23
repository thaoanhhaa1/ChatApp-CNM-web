import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CloseLineIcon, PhoneFillIcon, VideoFillIcon } from '~/assets';
import Modal from '../modal';
import Button from './Button';

const Call = ({ isVideoCall, show, onCancel = () => {}, onAccept = () => {} }) => {
    const { t } = useTranslation();

    return (
        <Modal show={show} onClickOutside={onCancel}>
            <div className="p-10 flex flex-col items-center gap-6">
                <div className="w-[96px] h-[96px] p-1 border border-[#f0eff5] dark:border-dark-separate rounded-full">
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                </div>
                <div className="text-center">
                    <h5 className="mb-2 text-lg font-semibold">Doris Brown</h5>
                    <p className="text-secondary text-mm">{t(`chat.${isVideoCall ? 'video' : 'audio'}-call`)}</p>
                </div>
                <div />
                <div className="flex gap-6">
                    <Button onClick={onCancel} className="bg-danger">
                        <CloseLineIcon />
                    </Button>
                    <Button onClick={onAccept} className="bg-success">
                        {(isVideoCall && <VideoFillIcon />) || <PhoneFillIcon />}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

Call.propTypes = {
    isVideoCall: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
};

export default Call;
