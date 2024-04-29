import { useDebounce } from '@uidotdev/usehooks';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from '~/assets';
import ContactList from '~/components/contactTab/groupTab/createGroup/ContactList';
import ItemSkeleton from '~/components/forwardMessage/ItemSkeleton';
import Input from '~/components/input';
import Modal from '~/components/modal';
import PhoneBookSkeleton from '~/components/phoneBook/PhoneBookSkeleton';
import { messageNotificationType } from '~/constants';
import { addMessageHeadSocket, addOrUpdateChat } from '~/features/chats/chatsSlice';
import { addOrUpdateGroup } from '~/features/contactGroups/contactGroupsSlice';
import { getFriends } from '~/features/friend/friendSlice';
import { addMessageSocket } from '~/features/messages/messagesSlice';
import groupServices from '~/services/group.service';
import messageServices from '~/services/message.service';
import { convertContactsToPhoneBook, phoneBookFilter } from '~/utils';

const AddMembers = ({ show, handleClickOutside }) => {
    const { t } = useTranslation();
    const [searchUser, setSearch] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { active } = useSelector((state) => state.chats);
    const { friendList, friendListLoading, friendListFirstFetch } = useSelector((state) => state.friend);
    const { socket } = useSelector((state) => state.socket);
    const phoneBook = useMemo(
        () =>
            convertContactsToPhoneBook(
                friendList.filter((friend) => !active.users.some((user) => user._id === friend._id)),
            ),
        [active.users, friendList],
    );
    const searchDebounce = useDebounce(searchUser, 500);
    const phoneBookFilterResult = useMemo(
        () => phoneBookFilter(phoneBook, searchDebounce, 'name'),
        [phoneBook, searchDebounce],
    );
    const dispatch = useDispatch();

    const handleRemoveContact = (contact) => {
        setSelectedContacts(selectedContacts.filter((item) => item._id !== contact._id));
    };

    const handleClickContact = (contact) => {
        const index = selectedContacts.findIndex((item) => item._id === contact._id);

        if (index !== -1) handleRemoveContact(contact);
        else setSelectedContacts([...selectedContacts, contact]);
        setSearch('');
    };

    const handleAddMembers = async () => {
        setLoading(true);

        try {
            const userIds = selectedContacts.map((item) => item._id);

            const [res, message] = await Promise.all([
                groupServices.addUsers({ params: [active._id], data: { userIds } }),
                messageServices.addMessageNotification({
                    conversationId: active._id,
                    userIds,
                    type: messageNotificationType.ADD_USERS,
                }),
            ]);

            dispatch(addOrUpdateChat(res.data));
            dispatch(addOrUpdateGroup(res.data));
            socket.emit('addOrUpdateConversation', {
                conversation: res.data,
                userIds: res.data.users.map((item) => item._id),
            });
            socket.emit('sendMessage', message.data);
            dispatch(addMessageSocket(message.data));
            dispatch(addMessageHeadSocket(message.data));
            handleClickOutside();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (show) return;

        setSearch('');
        setSelectedContacts([]);
    }, [show]);

    useEffect(() => {
        friendListFirstFetch || dispatch(getFriends());
    }, [dispatch, friendListFirstFetch]);

    if (!active?._id) return null;

    return (
        <Modal show={show} onClickOutside={handleClickOutside}>
            <Modal.Header onClose={handleClickOutside}>{t('group.add-members.title')}</Modal.Header>

            <div className="h-[75vh] flex flex-col">
                <div className="px-2 ex:px-3 smn:px-4 pt-2 ex:pt-3 smn:pt-4">
                    <Input
                        placeholder={t('contacts.create-group-modal.search-placeholder')}
                        containerClassName="mt-2 ex:mt-3 sm:mt-4 focus-within:border-primary-color dark:focus-within:border-primary-color"
                        Icon={SearchIcon}
                        outline
                        rounded
                        value={searchUser}
                        onChangeText={setSearch}
                    />

                    <div className="mt-2.5 ex:mt-3.5 sm:mt-5 h-[1px] bg-separate dark:bg-dark-separate" />
                </div>

                {friendListLoading && <PhoneBookSkeleton render={ItemSkeleton} />}
                <ContactList
                    handleClickContact={handleClickContact}
                    handleRemoveContact={handleRemoveContact}
                    phoneBook={phoneBookFilterResult}
                    selectedContacts={selectedContacts}
                    addedMembers={active.users}
                />
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleClickOutside} type="text-primary">
                    {t('group.add-members.cancel')}
                </Modal.Button>
                <Modal.Button
                    onClick={handleAddMembers}
                    disabled={selectedContacts.length === 0 || loading}
                    loading={loading}
                >
                    {t('group.add-members.confirm')}
                </Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

AddMembers.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClickOutside: PropTypes.func.isRequired,
};

export default AddMembers;
