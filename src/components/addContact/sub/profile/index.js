import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BlockIcon, ContactCardIcon, UserGroupIcon, WarningIcon } from '~/assets';
import Button from '~/components/button';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { blockContact, setContact, setPhoneNumber, unblockContact } from '~/features/addContact/addContactSlice';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import ProfileHeader from '../ProfileHeader';
import AddFriend from '../addFriend';
import Report from '../report';
import Action from './Action';
import PersonalInformation from './PersonalInformation';
import Alert from '~/components/alert';
import { classNames } from '~/utils';
import { personalInformation } from '~/constants';

const Profile = ({ onClose }) => {
    const { t } = useTranslation();
    const { contact } = useSelector((state) => state.addContact);
    const dispatch = useDispatch();
    const information = useMemo(() => personalInformation[contact?.blocked ? 'block' : 'noBlock'], [contact?.blocked]);

    const handleShareContact = () => {
        console.log('🚀 ~ handleShareContact ~ handleShareContact');
    };
    const handleShowGroupMutual = () => {
        console.log('🚀 ~ handleShowGroupMutual ~ handleShowGroupMutual');
    };
    const handleBlock = () => {
        dispatch(blockContact());

        // Show notification
    };
    const handleReport = () => dispatch(addSub(Report));

    const handleToggleFriend = () => {
        if (contact?.isFriend) {
            // Handle unfriend
        } else dispatch(addSub(AddFriend));
    };

    const handleClickChat = () => {
        console.log('🚀 ~ handleClickChat ~ handleClickChat');
    };
    const handleUnblock = () => dispatch(unblockContact());

    useEffect(() => {
        const getData = () => {
            // Load data........
            const fakeData = {
                background: 'https://res-zalo.zadn.vn/upload/media/2019/9/18/23_1568803270405_25190.jpg',
                avatar: 'https://zpsocial-f49-org.zadn.vn/7dc8107a5321bc7fe530.jpg',
                name: 'Nguyễn Thị Thơm',
                gender: 'Female',
                birthday: '17/01/2002',
                blocked: false,
            };

            dispatch(setContact(fakeData));
            dispatch(setPhoneNumber(''));
        };

        if (!contact.name) getData();
    }, [contact.name, dispatch]);

    if (!contact.name) return null;

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.modal.profile')}
            </Modal.Header>

            <div className="h-[calc(min(350px,60vh)+144px)]">
                <ScrollbarCustomize>
                    <div className="flex flex-col gap-1.5 bg-[#eef0f1]">
                        <div className="bg-white">
                            <ProfileHeader />

                            <div
                                className={classNames(
                                    'flex gap-3 mt-3 px-4 pb-4 justify-center',
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
                                        <Button onClick={handleToggleFriend} className="flex-1" outline>
                                            {t(`contacts.modal.${contact.isFriend ? 'undoRequest' : 'addFriend'}`)}
                                        </Button>
                                        <Button onClick={handleClickChat} className="flex-1" primary>
                                            {t('contacts.modal.chat')}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="px-4 py-3 bg-white">
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

                        <div className="py-3 bg-white">
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
