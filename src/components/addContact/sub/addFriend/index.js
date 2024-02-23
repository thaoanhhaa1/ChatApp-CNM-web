import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '~/components/modal';
import Switch from '~/components/switch';
import { TextareaCountChar } from '~/components/textarea';
import { constants } from '~/constants';
import { popSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import ProfileHeader from '../ProfileHeader';

const AddFriend = ({ onClose }) => {
    const { t } = useTranslation();
    const { contact } = useSelector((state) => state.addContact);
    const { user } = useSelector((state) => state.user);
    const [message, setMessage] = useState(
        () => `${t('contacts.modal.greetingMessage1')} ${user.name}. ${t('contacts.modal.greetingMessage2')}`,
    );
    const [blockViewFeed, setBlockViewFeed] = useState(false);
    const dispatch = useDispatch();

    const handleClickProfile = () => dispatch(popSub());
    const handleAddFriend = () => {
        console.group('Add friend');
        console.log('From: ', user);
        console.log('To: ', contact);
        console.log('Message: ', message);
        console.log('Block view feed: ', blockViewFeed);
        console.groupEnd();

        onClose();

        // Show message
    };

    if (!contact.name) return;

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.modal.profile')}
            </Modal.Header>

            <ProfileHeader />
            <div className="p-4">
                <TextareaCountChar
                    className="h-[120px]"
                    maxLength={constants.MAX_LENGTH_OF_GREETING_MESSAGE}
                    onChangeText={setMessage}
                    value={message}
                />

                <label className="cursor-pointer mt-4 h-11 px-4 rounded bg-[#f3f5f6] flex items-center justify-between">
                    <span className="text-sm leading-normal">{t('contacts.modal.notAllowViewFeed')}</span>
                    <Switch checked={blockViewFeed} onChange={setBlockViewFeed} />
                </label>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleClickProfile} type="text-primary">
                    {t('contacts.modal.information')}
                </Modal.Button>
                <Modal.Button onClick={handleAddFriend}>{t('contacts.modal.addFriend')}</Modal.Button>
            </Modal.Footer>
        </>
    );
};

AddFriend.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddFriend;
