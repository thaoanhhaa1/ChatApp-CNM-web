import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '~/components/modal';
import { removeConversation } from '~/features/chats/chatsSlice';
import { removeGroup } from '~/features/contactGroups/contactGroupsSlice';
import groupServices from '~/services/group.service';

const DeleteGroup = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDeleteGroup = async () => {
        setLoading(true);

        try {
            await groupServices.deleteGroup({
                params: [active._id],
            });

            dispatch(removeConversation(active._id));
            dispatch(removeGroup(active._id));
            socket.emit('deleteConversation', {
                _id: active._id,
                userIds: active.users.map((user) => user._id),
                userId: user._id,
            });
            onClickOutside();
        } catch (error) {
            toast.error(t('request-error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <Modal.Header onClose={onClickOutside}>{t('group.delete-group.title')}</Modal.Header>

            <p className="text-sm leading-normal px-2 ex:px-3 sm:px-4 py-2 ex:py-2.5 sm:py-3">
                {t('group.delete-group.description')}
            </p>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={onClickOutside} type="text-primary">
                    {t('group.delete-group.no')}
                </Modal.Button>
                <Modal.Button disabled={loading} loading={loading} onClick={handleDeleteGroup}>
                    {t('group.delete-group.delete-group')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

DeleteGroup.propTypes = {
    onClickOutside: PropTypes.func,
    show: PropTypes.bool,
};

export default DeleteGroup;
