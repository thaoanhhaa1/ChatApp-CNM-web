import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AddFriendBody from '~/components/addFriend';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { constants } from '~/constants';
import { addFriend } from '~/features/addContact/addContactSlice';
import { addChat } from '~/features/chats/chatsSlice';
import { addRequestFriend } from '~/features/friend/friendSlice';
import { popSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { setToast } from '~/features/toastAll/toastAllSlice';
import conversationServices from '~/services/conversation.service';

const AddFriend = ({ onClose }) => {
    const { t } = useTranslation();
    const { contact, addContactLoading } = useSelector((state) => state.addContact);
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        message: `${t('contacts.modal.greetingMessage1')} ${user.name}. ${t('contacts.modal.greetingMessage2')}`,
        blockView: false,
    });

    const handleClickProfile = () => dispatch(popSub());
    const handleAddFriend = async () => {
        const { message, blockView } = data;

        const [res, conversation] = await Promise.all([
            dispatch(addFriend({ friendId: contact._id, message, blockView })).unwrap(),
            conversationServices.openConversation(contact._id),
        ]);

        onClose();
        socket.emit('sendFriendRequest', {
            ...res.data,
            receiver_id: res.data.receiver_id._id,
            sender_id: user,
        });
        socket.emit('openConversation', {
            conversation: conversation.data,
            user,
        });
        dispatch(addChat(conversation.data));
        dispatch(addRequestFriend(res.data));
        dispatch(setToast(t('contacts.modal.addFriendSuccess')));
    };

    if (!contact.name) return;

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.modal.profile')}
            </Modal.Header>

            <div className="h-[min(350px,60vh)] overflow-hidden">
                <ScrollbarCustomize>
                    <AddFriendBody
                        blockViewTitle={t('contacts.modal.notAllowViewFeed')}
                        setData={setData}
                        data={data}
                        maxLength={constants.MAX_LENGTH_OF_GREETING_MESSAGE}
                    />
                </ScrollbarCustomize>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleClickProfile} type="text-primary">
                    {t('contacts.modal.information')}
                </Modal.Button>
                <Modal.Button disabled={addContactLoading} loading={addContactLoading} onClick={handleAddFriend}>
                    {t('contacts.modal.addFriend')}
                </Modal.Button>
            </Modal.Footer>
        </>
    );
};

AddFriend.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddFriend;
