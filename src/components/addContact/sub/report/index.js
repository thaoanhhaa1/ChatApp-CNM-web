import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { MoreFillIcon } from '~/assets';
import Checkbox from '~/components/checkbox';
import FormControlLabel from '~/components/formControlLabel';
import Modal from '~/components/modal';
import RadioLabelList from '~/components/radioLabelList';
import { TextareaCountChar } from '~/components/textarea';
import { constants } from '~/constants';
import { popSub, resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { classNames } from '~/utils';

const reasons = [
    {
        value: 'sensitive-content',
        label: 'contacts.modal.sensitiveContent',
    },
    {
        value: 'annoying',
        label: 'contacts.modal.annoying',
    },
    {
        value: 'scam',
        label: 'contacts.modal.scam',
    },
    {
        value: 'other',
        label: 'contacts.modal.other',
        icon: MoreFillIcon,
    },
];

const Report = ({ onClose }) => {
    const { t } = useTranslation();
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(true);
    const { contact } = useSelector((state) => state.addContact);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleClickCancel = () => dispatch(popSub());
    const handleReport = () => {
        console.group('Report');
        console.log('From: ', user);
        console.log('To: ', contact);
        console.log('Reason: ', reason);
        console.log('Message: ', message);
        console.log('Checked: ', checked);
        console.groupEnd();

        dispatch(resetSubs());
    };

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.modal.report')}
            </Modal.Header>

            <div className="p-4">
                <p className="text-sm leading-normal mb-3">{t('contacts.modal.reportDescription')}</p>

                <RadioLabelList
                    list={reasons.map((item) => ({ ...item, label: t(item.label) }))}
                    name="report"
                    onChange={setReason}
                />

                <div
                    className={classNames(
                        'mt-3 transition-all duration-200',
                        reason === 'other' ? 'opacity-100' : 'opacity-0',
                    )}
                >
                    <span className="text-sm leading-normal">{t('contacts.modal.other')}:</span>
                    <TextareaCountChar
                        className="h-32 mt-1.5"
                        maxLength={constants.MAX_LENGTH_OF_REASON_REPORT}
                        onChangeText={setMessage}
                        value={message}
                    />
                </div>

                <FormControlLabel
                    className="mt-4"
                    control={<Checkbox checked={checked} onChange={setChecked} />}
                    label={t('contacts.modal.blockAndDeleteConversations')}
                />
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={handleClickCancel} type="text-primary">
                    {t('contacts.modal.cancel')}
                </Modal.Button>
                <Modal.Button onClick={handleReport} disabled={!reason || (reason === 'other' && !message)}>
                    {t('contacts.modal.report')}
                </Modal.Button>
            </Modal.Footer>
        </>
    );
};

Report.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Report;
