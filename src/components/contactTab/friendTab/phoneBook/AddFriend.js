import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AddFriendBody from '~/components/addFriend';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { constants } from '~/constants';
import { updateContact } from '~/features/phoneBook/phoneBookSlice';

const AddFriend = ({ onClose }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const { contact } = useSelector((state) => state.addContact);
    const [data, setData] = useState({
        message: `${t('contacts.phone-book.greetingMessage1')} ${user.name}. ${t(
            'contacts.phone-book.greetingMessage2',
        )}.`,
        blockView: false,
    });
    const dispatch = useDispatch();

    const handleAddFriend = () => {
        console.group('handleAddFriend');
        console.log('From: ', user);
        console.log('To: ', contact);
        console.log(data);
        console.groupEnd();
    };

    useEffect(() => {
        return () => {
            dispatch(updateContact(contact));

            // TODO Update on server...
        };
    }, [contact, dispatch]);

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
