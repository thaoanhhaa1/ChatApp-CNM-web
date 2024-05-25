import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { InfoIcon, SearchIcon } from '~/assets';
import Input from '~/components/input';
import Modal from '~/components/modal';
import PhoneBook from '~/components/phoneBook';
import PhoneBookItem from '~/components/phoneBookItem';
import PopupMultiLevel from '~/components/popupMultiLevel';
import RadioLabelList from '~/components/radioLabelList';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { FriendStatus, messageNotificationType, phoneBookFilter, phoneBookFilterConst } from '~/constants';
import { setContact } from '~/features/addContact/addContactSlice';
import { acceptFriendReceived, rejectFriendSent } from '~/features/friend/friendSlice';
import { getPhoneBook } from '~/features/phoneBook/phoneBookSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { useSendMessage } from '~/hooks';
import conversationServices from '~/services/conversation.service';
import friendServices from '~/services/friend.service';
import messageServices from '~/services/message.service';
import { getDate, getTime } from '~/utils';
import Seperate from '../../Seperate';
import AddFriend from './AddFriend';
import { withErrorBoundary } from 'react-error-boundary';

const PhoneBookSub = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState(phoneBookFilterConst.ALL);
    const { user } = useSelector((state) => state.user);
    const { phoneBook, lastUpdated } = useSelector((state) => state.phoneBook);
    const { socket } = useSelector((state) => state.socket);
    const { friendReceived, friendSent, friendList } = useSelector((state) => state.friend);
    const labels = useMemo(() => Object.keys(phoneBook), [phoneBook]);
    const { handleSendNotificationMessage } = useSendMessage();
    const contactFilter = useMemo(() => {
        if (filter === phoneBookFilterConst.ALL) return phoneBook;
        const friendIds = friendList.map((item) => item._id);

        return labels.reduce(
            (prev, label) => ({
                ...prev,
                [label]: phoneBook[label].filter((contact) => !friendIds.includes(contact._id)),
            }),
            {},
        );
    }, [filter, friendList, labels, phoneBook]);
    const dispatch = useDispatch();

    const handleAddFriend = (contact) => {
        dispatch(setContact(contact));
        dispatch(addSub(AddFriend));
    };

    const handleRecall = async (contact) => {
        const friendRequest = friendSent.find((item) => item.receiver_id._id === contact._id);
        await toast.promise(friendServices.revocationRequestFriend(contact._id), {
            pending: t('contacts.phone-book.recall-loading'),
            success: t('contacts.phone-book.recall-success'),
            error: t('contacts.phone-book.recall-error'),
        });

        dispatch(setContact({ ...contact, status: FriendStatus.NOT_FRIEND }));
        dispatch(rejectFriendSent(friendRequest._id));
        socket.emit('revocationRequestFriend', {
            _id: friendRequest._id,
            senderId: friendRequest.receiver_id._id,
            receivedId: friendRequest.sender_id,
        });
    };

    const handleAcceptFriendRequest = async (contact) => {
        const friendResponse = friendReceived.find((item) => item.sender_id._id === contact._id);

        const promise = new Promise(async (resolve, reject) => {
            try {
                const conversation = await conversationServices.openConversation(contact._id);
                const [, messageRes] = await Promise.all([
                    friendServices.acceptFriend(contact._id),
                    messageServices.addMessageNotification({
                        type: messageNotificationType.ACCEPT_FRIEND,
                        conversationId: conversation.data._id,
                    }),
                ]);

                resolve({ messageRes });
            } catch (error) {
                reject(error);
            }
        });

        const { messageRes } = await toast.promise(promise, {
            pending: t('contacts.phone-book.accept-loading'),
            success: t('contacts.phone-book.accept-success'),
            error: t('contacts.phone-book.accept-error'),
        });

        socket.emit('acceptFriend', { _id: friendResponse._id, user, senderId: contact._id });
        handleSendNotificationMessage(messageRes);
        dispatch(acceptFriendReceived({ _id: friendResponse._id, user: contact }));
        dispatch(setContact({ ...contact, status: FriendStatus.FRIEND }));
    };

    useEffect(() => {
        dispatch(getPhoneBook(user.id));
    }, [dispatch, user.id]);

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <PopupMultiLevel onClose={onClickOutside}>
                <Modal.Header onClose={onClickOutside}>{t('contacts.directory')}</Modal.Header>

                <div className="gap-2 flex flex-col px-2 sm:px-3 ex:px-4 py-2 h-[min(600px,80vh)]">
                    <div className="flex gap-x-2 items-center justify-between flex-wrap">
                        <div className="flex gap-2 items-center text-sm">
                            <span>{t('contacts.phone-book.last-update')}</span>
                            <span className="">
                                <InfoIcon className="w-[18px] h-[18px]" />
                            </span>
                        </div>
                        <span className="text-mm font-medium">
                            {getDate(lastUpdated)} {getTime(lastUpdated)}
                        </span>
                    </div>
                    <Seperate />
                    <Input Icon={SearchIcon} placeholder={t('contacts.phone-book.search')} />
                    <RadioLabelList
                        className="mt-1"
                        onChange={setFilter}
                        name="phone-book"
                        list={phoneBookFilter.map((item) => ({
                            ...item,
                            label: t(item.label),
                            defaultChecked: filter === item.value,
                        }))}
                    />
                    <div className="h-[1px] bg-separate dark:bg-dark-separate sm:-mx-3 ex:-mx-4 -mx-2"></div>
                    <div className="flex-1 sm:-mx-3 ex:-mx-4 -mx-2">
                        <ScrollbarCustomize>
                            <PhoneBook
                                phoneBook={contactFilter}
                                render={(contact) => (
                                    <PhoneBookItem
                                        onAdd={() => handleAddFriend(contact)}
                                        onRecall={() => handleRecall(contact)}
                                        onAccept={() => handleAcceptFriendRequest(contact)}
                                        contact={contact}
                                        key={contact._id}
                                    />
                                )}
                            />
                        </ScrollbarCustomize>
                    </div>
                </div>
            </PopupMultiLevel>
        </Modal>
    );
};

PhoneBookSub.propTypes = {
    show: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default withErrorBoundary(PhoneBookSub, {
    fallback: null,
    onError: (error, info) => {
        toast.error('PhoneBookSub::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
