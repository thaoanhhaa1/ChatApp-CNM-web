import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LeftLineIcon, LockIcon } from '~/assets';
import Button from '~/components/button';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { groupRole } from '~/constants';
import { useChat } from '~/context';
import { removeConversation, setActive } from '~/features/chats/chatsSlice';
import { removeGroup } from '~/features/contactGroups/contactGroupsSlice';
import groupServices from '~/services/group.service';
import { classNames } from '~/utils';

const ManageGroup = ({ onBack }) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.user);
    const { myRole } = useChat();
    const dispatch = useDispatch();

    if (!active) return null;

    const handleClickOutside = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleDeleteGroup = async () => {
        setLoading(true);

        try {
            await groupServices.deleteGroup({
                params: [active._id],
            });

            dispatch(setActive(null));
            dispatch(removeConversation(active._id));
            dispatch(removeGroup(active._id));
            socket.emit('deleteConversation', {
                _id: active._id,
                userIds: active.users.map((user) => user._id),
                userId: user._id,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            handleClickOutside();
        }
    };

    return (
        <div className="absolute inset-0 bg-white z-10 flex flex-col">
            <div className="relative h-[68px] flex justify-center items-center border-b border-separate dark:border-dark-separate">
                <h2 className="text-lg font-medium text-center">{t('group.manage.title')}</h2>
                {onBack ? (
                    <span
                        onClick={onBack}
                        className="cursor-pointer absolute left-2 w-8 h-8 flex justify-center items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 rounded-lg transition-all"
                    >
                        <LeftLineIcon className="w-5 h-5" />
                    </span>
                ) : null}
            </div>
            <ScrollbarCustomize>
                {myRole === groupRole.MEMBER_ROLE ? (
                    <div className="h-10 bg-[#f9fafb] flex items-center gap-1.5 justify-center">
                        <LockIcon className="w-[14px] h-[14px]" />
                        <span className="text-ss">{t('group.manage.warning')}</span>
                    </div>
                ) : null}
                <div className="flex flex-col gap-2 bg-[#eef0f1]">
                    {/* TODO Settings */}
                    <div
                        className={classNames(
                            'flex flex-col gap-2',
                            myRole === groupRole.MEMBER_ROLE && 'cursor-not-allowed',
                        )}
                    ></div>

                    {myRole === groupRole.OWNER_ROLE ? (
                        <div className="p-4 bg-white">
                            <Button onClick={handleShowModal} className="w-full h-8" danger>
                                {t('group.manage.delete')}
                            </Button>
                        </div>
                    ) : null}
                </div>
            </ScrollbarCustomize>

            <Modal show={showModal} onClickOutside={handleClickOutside}>
                <Modal.Header onClose={handleClickOutside}>{t('group.manage.delete')}</Modal.Header>
                <div className="p-4 text-sm">{t('group.manage.delete-description')}</div>
                <Modal.Footer className="flex justify-end items-center gap-2">
                    <Modal.Button onClick={handleClickOutside} type="text-primary">
                        {t('group.manage.no')}
                    </Modal.Button>
                    <Modal.Button onClick={handleDeleteGroup} loading={loading} disabled={loading} type="danger">
                        {t('group.manage.delete')}
                    </Modal.Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

ManageGroup.propTypes = {
    onBack: PropTypes.func,
};

export default ManageGroup;
