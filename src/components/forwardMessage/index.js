import { useDebounce } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from '~/assets';
import { addChat, addMessageHeadSocket } from '~/features/chats/chatsSlice';
import { addMessageSocket } from '~/features/messages/messagesSlice';
import conversationServices from '~/services/conversation.service';
import messageServices from '~/services/message.service';
import { getOtherUserInIndividual } from '~/utils';
import Input from '../input';
import Modal from '../modal';
import ContactList from './ContactList';

const ForwardMessage = ({ messageId, show, handleClickOutside }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const searchDebounce = useDebounce(name, 500);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const { user } = useSelector((state) => state.user);
    const { chats, active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const phoneBookFilterResult = useMemo(() => {
        const phoneBook = [];

        chats.forEach((chat) => {
            const contact = chat.users.find((u) => {
                return u._id !== user._id && u.name.toLowerCase().includes(searchDebounce.toLowerCase());
            });

            if (contact)
                phoneBook.push({
                    ...chat,
                    user: contact,
                });
        });

        return phoneBook;
    }, [chats, searchDebounce, user._id]);

    const handleForward = async () => {
        setLoading(true);

        try {
            console.log('🚀 ~ handleForward ~ selectedContacts:', selectedContacts);

            const selectedUserIds = [];
            const selectedGroupIds = [];

            selectedContacts.forEach((selected) => {
                if (selected.isGroup) selectedGroupIds.push(selected._id);
                else selectedUserIds.push(selected._id);
            });
            console.log('🚀 ~ handleForward ~ selectedUserIds:', selectedUserIds);

            const conversationIndividualIds = [];

            chats.forEach((chat) => {
                if (chat.isGroup) return;

                const index = selectedUserIds.findIndex(
                    (userId) => getOtherUserInIndividual(chat.users, user._id)?._id === userId,
                );

                if (index === -1) return;

                selectedUserIds.splice(index, 1);
                conversationIndividualIds.push(chat._id);
            });

            if (selectedUserIds.length) {
                const conversations = (
                    await Promise.all(selectedUserIds.map((userId) => conversationServices.openConversation(userId)))
                ).map((res) => res.data);

                conversations.forEach((conversation) => {
                    conversationIndividualIds.push(conversation._id);
                    dispatch(
                        addChat({
                            ...conversation,
                            myId: user._id,
                        }),
                    );
                    socket.emit('openConversation', {
                        conversation,
                        user,
                    });
                });
            }

            const res = await messageServices.forward({
                messageId,
                conversationIds: [...selectedGroupIds, ...conversationIndividualIds],
            });

            socket.emit('forward', res.data);
            res.data.forEach((message) => {
                // Messages Slice
                if (active?._id === message.conversation._id) dispatch(addMessageSocket(message));

                // Chats Slice
                dispatch(
                    addMessageHeadSocket({
                        ...message,
                        myId: user._id,
                    }),
                );
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            handleClickOutside();
        }
    };

    const handleClickContact = (contact) => {
        const index = selectedContacts.findIndex((item) => item._id === contact._id);

        if (index > -1) handleRemoveContact(contact);
        else setSelectedContacts((contacts) => [...contacts, contact]);
        setName('');
    };

    const handleRemoveContact = (contact) => {
        const index = selectedContacts.findIndex((item) => item._id === contact._id);

        setSelectedContacts((contacts) => {
            const newContacts = [...contacts];

            newContacts.splice(index, 1);

            return newContacts;
        });
    };

    useEffect(() => {
        if (!show) {
            setSelectedContacts([]);
            setName('');
        }
    }, [show]);

    return (
        <Modal show={show} onClickOutside={handleClickOutside}>
            <Modal.Header onClose={handleClickOutside}>{t('chat.share')}</Modal.Header>

            <div className="h-[75vh] flex flex-col">
                <div className="px-2 ex:px-3 smn:px-4 pt-2 ex:pt-3">
                    <Input
                        placeholder={t('contacts.create-group-modal.search-placeholder')}
                        containerClassName="focus-within:border-primary-color dark:focus-within:border-primary-color"
                        Icon={SearchIcon}
                        outline
                        rounded
                        value={name}
                        onChangeText={setName}
                    />

                    <div className="mt-2 ex:mt-3 h-[1px] bg-separate dark:bg-dark-separate" />
                </div>

                <ContactList
                    handleClickContact={handleClickContact}
                    handleRemoveContact={handleRemoveContact}
                    chat={phoneBookFilterResult}
                    selectedContacts={selectedContacts}
                />
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleClickOutside} type="text-primary">
                    {t('contacts.create-group-modal.cancel')}
                </Modal.Button>
                <Modal.Button onClick={handleForward} loading={loading} disabled={!selectedContacts.length || loading}>
                    {t('chat.share')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

ForwardMessage.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClickOutside: PropTypes.func.isRequired,
    messageId: PropTypes.string.isRequired,
};

export default ForwardMessage;
