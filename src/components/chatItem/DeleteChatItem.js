import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteChat } from '~/features/chats/chatsSlice';
import conversationServices from '~/services/conversation.service';
import Modal from '../modal';

const DeleteChatItem = ({ conversationId, show, onClickOutside }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteConversation = async (e) => {
        e.stopPropagation();
        setLoading(true);

        try {
            await conversationServices.deleteConversation(conversationId);

            onClickOutside();
            dispatch(deleteChat(conversationId));
        } catch (error) {
            console.error(error);

            toast.error(t('request-error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <Modal.Header onClose={onClickOutside}>{t('conversation.delete.title')}</Modal.Header>

            {/* TODO ... SOS */}
            <div className="p-2 ex:p-3 sm:p-4 text-sm">
                <p>{t('conversation.delete.description-1')}</p>
                <p>{t('conversation.delete.description-2')}</p>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button disabled={loading} onClick={onClickOutside} type="text-primary">
                    {t('conversation.delete.no')}
                </Modal.Button>
                <Modal.Button disabled={loading} loading={loading} onClick={handleDeleteConversation}>
                    {t('conversation.delete.delete')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

DeleteChatItem.propTypes = {
    conversationId: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default DeleteChatItem;
