import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BlockIcon, ContactCardIcon, PencilLineIcon, UserGroupIcon, WarningIcon } from '~/assets';
import Avatar from '~/components/avatar';
import Button from '~/components/button';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import Action from './Action';
import PersonalInformation from './PersonalInformation';

const Profile = ({ onClose }) => {
    const { t } = useTranslation();

    const handleShareContact = () => {
        console.log('🚀 ~ handleShareContact ~ handleShareContact');
    };
    const handleShowGroupMutual = () => {
        console.log('🚀 ~ handleShowGroupMutual ~ handleShowGroupMutual');
    };
    const handleBlock = () => {
        console.log('🚀 ~ handleBlock ~ handleBlock');
    };
    const handleReport = () => {
        console.log('🚀 ~ handleReport ~ handleReport');
    };

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.modal.profile')}
            </Modal.Header>

            <div className="h-[calc(min(350px,60vh)+144px)]">
                <ScrollbarCustomize>
                    <div className="flex flex-col gap-1.5 bg-[#eef0f1]">
                        <div className="bg-white">
                            <img
                                className="w-full aspect-[400/171] object-cover"
                                src="https://res-zalo.zadn.vn/upload/media/2019/9/18/23_1568803270405_25190.jpg"
                                alt=""
                            />

                            <div className="flex flex-col px-4 pb-4 -mt-4 gap-3">
                                <div className="flex gap-4 items-center">
                                    <Avatar
                                        src="https://zpsocial-f49-org.zadn.vn/7dc8107a5321bc7fe530.jpg"
                                        size="80px"
                                    />
                                    <div className="flex items-center">
                                        <h3 className="text-lg leading-normal font-medium">Nguyễn Thị Thơm</h3>
                                        <span className="p-1 ml-2 cursor-pointer text-primary rounded-lg hover:bg-[#dfe2e7] transition-all">
                                            <PencilLineIcon className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button className="flex-1" outline>
                                        {t('contacts.modal.addFriend')}
                                    </Button>
                                    <Button className="flex-1" primary>
                                        {t('contacts.modal.chat')}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-3 bg-white">
                            <h4 className="text-base leading-normal font-medium">
                                {t('contacts.modal.personalInformation')}
                            </h4>
                            <div className="pt-3 flex flex-col gap-2">
                                <PersonalInformation label={t('contacts.modal.gender')} value="Female" />
                                <PersonalInformation label={t('contacts.modal.birthday')} value="17/01/2002" />
                            </div>
                        </div>

                        <div className="py-3 bg-white">
                            <Action onClick={handleShareContact} disabled Icon={ContactCardIcon}>
                                {t('contacts.modal.shareContact')}
                            </Action>
                            <Action onClick={handleShowGroupMutual} disabled Icon={UserGroupIcon}>
                                {t('contacts.modal.mutualGroup')}
                            </Action>
                            <Action onClick={handleBlock} Icon={BlockIcon}>
                                {t('contacts.modal.blockMessagesAndCalls')}
                            </Action>
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
