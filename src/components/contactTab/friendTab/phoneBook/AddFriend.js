import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddFriendBody from '~/components/addFriend';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { constants } from '~/constants';
import { addFriend } from '~/features/addContact/addContactSlice';
import { addChat } from '~/features/chats/chatsSlice';
import { addRequestFriend } from '~/features/friend/friendSlice';
import { popSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import conversationServices from '~/services/conversation.service';

const AddFriend = ({ onClose }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const { contact } = useSelector((state) => state.addContact);
    const { socket } = useSelector((state) => state.socket);
    const [data, setData] = useState({
        message: `${t('contacts.phone-book.greetingMessage1')} ${user.name}. ${t(
            'contacts.phone-book.greetingMessage2',
        )}.`,
        blockView: false,
    });
    const dispatch = useDispatch();

    const handleAddFriend = async () => {
        const [res, conversation] = await toast.promise(
            Promise.all([
                dispatch(addFriend({ friendId: contact._id, ...data })).unwrap(),
                conversationServices.openConversation(contact._id),
            ]),
            {
                pending: t('contacts.phone-book.addFriend-loading'),
                success: t('contacts.phone-book.addFriend-success'),
                error: t('contacts.phone-book.addFriend-error'),
            },
        );

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
        dispatch(popSub());
    };

    useEffect(() => {
        return () => dispatch(popSub());
    }, [dispatch]);

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.modal.profile')}
            </Modal.Header>

            <div className="h-[calc(min(600px,80vh)-144px)]">
                <ScrollbarCustomize>
                    <AddFriendBody
                        blockViewTitle={t('contacts.phone-book.notAllowViewFeed')}
                        setData={setData}
                        data={data}
                        maxLength={constants.MAX_LENGTH_OF_GREETING_MESSAGE}
                    />
                </ScrollbarCustomize>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleAddFriend}>{t('contacts.modal.addFriend')}</Modal.Button>
            </Modal.Footer>
        </>
    );
};

AddFriend.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddFriend;
