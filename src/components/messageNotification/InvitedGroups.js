import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Modal from '../modal';
import InvitedGroup from './InvitedGroup';

const InvitedGroups = ({ conversations, show, onClickOutside }) => {
    const { t } = useTranslation();

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <Modal.Header onClose={onClickOutside}>
                {t('message-notification.invite-to-group.model.title')}
            </Modal.Header>

            <div>
                <p className="py-2 px-5 text-sm font-medium">
                    {t('message-notification.invite-to-group.model.invited-success')}
                </p>
                <div>
                    {conversations.map((conversation) => (
                        <InvitedGroup onClose={onClickOutside} conversation={conversation} key={conversation._id} />
                    ))}
                </div>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={onClickOutside} type="text-primary">
                    {t('message-notification.invite-to-group.model.close')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

InvitedGroups.propTypes = {
    conversations: PropTypes.array.isRequired,
    show: PropTypes.bool,
    onClickOutside: PropTypes.func,
};

export default InvitedGroups;
