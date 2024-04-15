import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BlockIcon, ContactCardIcon, UserGroupIcon, WarningIcon } from '~/assets';
import Alert from '~/components/alert';
import Button from '~/components/button';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { personalInformation } from '~/constants';
import { blockContact, setContact, unblockContact } from '~/features/addContact/addContactSlice';
import { getConversation, setActive } from '~/features/chats/chatsSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import friendServices from '~/services/friend.service';
import { classNames, getChatIndividual } from '~/utils';
import ProfileHeader from '../ProfileHeader';
import AddFriend from '../addFriend';
import Report from '../report';
import Action from './Action';
import PersonalInformation from './PersonalInformation';

const Profile = ({ onClose }) => {
    const { t } = useTranslation();
    const { contact } = useSelector((state) => state.addContact);
    const { chats } = useSelector((state) => state.chats);
    const { updateHeightPopup } = useSelector((state) => state.popupMultiLevel);
    const dispatch = useDispatch();
    const information = useMemo(() => personalInformation[contact?.blocked ? 'block' : 'noBlock'], [contact?.blocked]);
    const [chatLoading, setChatLoading] = useState(false);
    const [otherLoading, setOtherLoading] = useState(false);

    // TODO
    const handleShareContact = () => {
        console.log('🚀 ~ handleShareContact ~ handleShareContact');
    };

    // TODO
    const handleShowGroupMutual = () => {
        console.log('🚀 ~ handleShowGroupMutual ~ handleShowGroupMutual');
    };

    // TODO
    const handleBlock = () => {
        dispatch(blockContact());

        // Show notification
    };

    // TODO
    const handleReport = () => dispatch(addSub(Report));

    // TODO Realtime
    const handleUndo = async () => {
        setOtherLoading(true);

        try {
            await friendServices.revocationRequestFriend(contact._id);

            dispatch(setContact({ ...contact, status: 0 }));
        } catch (error) {
        } finally {
            setOtherLoading(false);
        }
    };

    // TODO Realtime
    const handleAddFriend = () => dispatch(addSub(AddFriend));

    // TODO
    const handleAcceptFriend = () => {};

    const handleClickChat = async () => {
        setChatLoading(true);

        try {
            const chat = getChatIndividual(chats, contact._id);

            if (chat) dispatch(setActive(chat));
            else await dispatch(getConversation(contact._id)).unwrap();
        } catch (error) {
            console.error(error);
        } finally {
            setChatLoading(false);
            onClose();
        }
    };

    // TODO
    const handleUnblock = () => dispatch(unblockContact());

    useEffect(() => {
        updateHeightPopup();
    }, [updateHeightPopup]);

    if (!contact.name) return null;

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.modal.profile')}
            </Modal.Header>

            <div className="h-[calc(min(600px,80vh)-45px)]">
                <ScrollbarCustomize>
                    <div className="flex flex-col gap-1.5 bg-[#eef0f1] dark:bg-[#2c2e2f]">
                        <div className="bg-white dark:bg-[#242526]">
                            <ProfileHeader />

                            <div
                                className={classNames(
                                    'flex gap-2 ex:gap-3 mt-2.5 ex:mt-3 px-2 ex:px-3 sm:px-4 pb-2 ex:pb-3 sm:pb-4 justify-center',
                                    contact.blocked && 'flex-col',
                                )}
                            >
                                {(contact.blocked && (
                                    <>
                                        <Alert className="w-full" Icon={WarningIcon} severity="warning">
                                            {t('contacts.modal.blockWarning')}
                                        </Alert>
                                        <div className="text-center text-sm leading-normal mt-1">
                                            <p className="text-secondary dark:text-dark-secondary">
                                                {t('contacts.modal.unblockTitle')}
                                            </p>
                                            <span onClick={handleUnblock} className="cursor-pointer text-primary-color">
                                                {t('contacts.modal.unblock')}
                                            </span>
                                        </div>
                                    </>
                                )) || (
                                    <>
                                        {contact.status === 2 && (
                                            <Button
                                                loading={otherLoading}
                                                disabled={otherLoading}
                                                onClick={handleUndo}
                                                className="flex-1"
                                                outline
                                            >
                                                {t(`contacts.modal.undoRequest`)}
                                            </Button>
                                        )}
                                        {contact.status === 0 && (
                                            <Button
                                                loading={otherLoading}
                                                disabled={otherLoading}
                                                onClick={handleAddFriend}
                                                className="flex-1"
                                                outline
                                            >
                                                {t(`contacts.modal.addFriend`)}
                                            </Button>
                                        )}
                                        {contact.status === 3 && (
                                            <Button
                                                loading={otherLoading}
                                                disabled={otherLoading}
                                                onClick={handleAcceptFriend}
                                                className="flex-1"
                                                outline
                                            >
                                                {t(`contacts.modal.accept`)}
                                            </Button>
                                        )}
                                        <Button
                                            loading={chatLoading}
                                            disabled={chatLoading}
                                            onClick={handleClickChat}
                                            className="flex-1"
                                            primary
                                        >
                                            {t('contacts.modal.chat')}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="px-2 ex:px-3 sm:px-4 py-2 ex:py-2.5 sm:py-3 bg-white dark:bg-[#242526]">
                            <h4 className="text-base leading-normal font-medium">
                                {t('contacts.modal.personalInformation')}
                            </h4>
                            <div className="pt-3 flex flex-col gap-2">
                                {information.map((info) => (
                                    <PersonalInformation
                                        key={info.key}
                                        label={t(`contacts.modal.${info.label}`)}
                                        value={contact[info.key] || ''}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="py-2 ex:py-2.5 sm:py-3 bg-white dark:bg-[#242526]">
                            {contact?.blocked || (
                                <>
                                    <Action onClick={handleShowGroupMutual} disabled Icon={UserGroupIcon}>
                                        {t('contacts.modal.mutualGroup')}&nbsp;({0})
                                    </Action>
                                    <Action onClick={handleShareContact} disabled Icon={ContactCardIcon}>
                                        {t('contacts.modal.shareContact')}
                                    </Action>
                                    <Action onClick={handleBlock} Icon={BlockIcon}>
                                        {t('contacts.modal.blockMessagesAndCalls')}
                                    </Action>
                                </>
                            )}
                            {contact?.blocked && (
                                <Action onClick={handleUnblock} Icon={BlockIcon}>
                                    {t('contacts.modal.unblock')}
                                </Action>
                            )}
                            <Action onClick={handleReport} Icon={WarningIcon}>
                                {t('contacts.modal.report')}
                            </Action>
                        </div>
                    </div>
                </ScrollbarCustomize>
            </div>
        </>
    );
};

Profile.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Profile;
