import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CloseLineIcon, PhoneFillIcon, VideoFillIcon } from '~/assets';
import { callType } from '~/constants';
import { useCalling } from '~/hooks';
import ConversationAvatar from '../conversationAvatar';
import Modal from '../modal';
import Button from './Button';

const CallWaiting = ({ onClose = () => {} }) => {
    const { t } = useTranslation();
    const { _id, sender, users, type } = useSelector((state) => state.calling);
    const { handleReject, handleAccept } = useCalling();
    const conversationType = users.length > 2 ? 'group' : 'individual';

    if (!_id) return null;

    return (
        <Modal show onClickOutside={handleReject}>
            <div className="p-10 flex flex-col items-center gap-6">
                <ConversationAvatar
                    conversation={{
                        _id,
                        users: [sender],
                    }}
                    size="96px"
                />
                <div className="text-center">
                    <h5 className="mb-2 text-lg font-semibold">
                        {sender.name}
                        &nbsp;
                        {t(`calling.${type}.${conversationType}-waiting`)}
                    </h5>
                    <p className="text-secondary text-mm">{t(`chat.${type}-call`)}</p>
                </div>
                <div />
                <div className="flex gap-6">
                    <Button onClick={handleReject} className="bg-danger">
                        <CloseLineIcon />
                    </Button>
                    <Button onClick={handleAccept(onClose)} className="bg-success">
                        {(type === callType.VIDEO && <VideoFillIcon />) || <PhoneFillIcon />}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

CallWaiting.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CallWaiting;
