import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CloseLineIcon, PhoneFillIcon, VideoFillIcon } from '~/assets';
import { getNameConversation } from '~/utils';
import ConversationAvatar from '../conversationAvatar';
import Modal from '../modal';
import Button from './Button';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const Call = ({ isVideoCall, show, onCancel = () => {}, onAccept = () => {} }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const { active } = useSelector((state) => state.chats);
    const conversationName = getNameConversation(active, user._id);

    return (
        <Modal show={show} onClickOutside={onCancel}>
            <div className="p-10 flex flex-col items-center gap-6">
                <ConversationAvatar conversation={active} size="96px" />
                <div className="text-center">
                    <h5 className="mb-2 text-lg font-semibold">{conversationName}</h5>
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

export default withErrorBoundary(Call, {
    fallback: null,
    onError: (error, info) => {
        toast.error('Call::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
