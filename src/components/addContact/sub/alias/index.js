import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '~/components/avatar';
import Input from '~/components/input';
import Modal from '~/components/modal';
import { setContact } from '~/features/addContact/addContactSlice';
import { popSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';

const Alias = ({ onClose }) => {
    const { t } = useTranslation();
    const { contact } = useSelector((state) => state.addContact);
    const [name, setName] = useState(contact.alias || contact.name || '');
    const dispatch = useDispatch();

    const handleCancel = () => dispatch(popSub());
    const handleConfirm = () => {
        // Update alias in DB...

        dispatch(
            setContact({
                ...contact,
                alias: name,
            }),
        );
        dispatch(popSub());
    };

    return (
        <>
            <Modal.Header onClose={onClose} showBack>
                {t('contacts.modal.setAlias')}
            </Modal.Header>

            <div className="px-4 py-3">
                <div>
                    <Avatar containerClassName="mx-auto" src={contact.avatar} size="72px" />
                </div>
                <div className="mt-4 px-2 text-center text-sm leading-normal">
                    <p>
                        {t('contacts.modal.setAliasTitle')}&nbsp;
                        <span className="font-medium">{contact.name}</span>.
                    </p>
                    <p>{t('contacts.modal.setAliasNotice')}</p>
                </div>
                <div className="max-w-[320px] mx-auto mt-3">
                    <Input value={name} placeholder={contact.alias || contact.name} onChangeText={setName} />
                </div>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleCancel} type="text-primary">
                    {t('contacts.modal.cancel')}
                </Modal.Button>
                <Modal.Button onClick={handleConfirm}>{t('contacts.modal.confirm')}</Modal.Button>
            </Modal.Footer>
        </>
    );
};

Alias.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Alias;
