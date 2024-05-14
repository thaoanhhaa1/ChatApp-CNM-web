import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Checkbox from '~/components/checkbox';
import FormControlLabel from '~/components/formControlLabel';
import Modal from '~/components/modal';
import Switch from '~/components/switch';
import Seperate from '../../Seperate';

const Manage = ({ onClose }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const [allowAddByPhone, setAllowAddByPhone] = useState(true);
    const [qrCode, setQrCode] = useState(true);
    const [commonGroup, setCommonGroup] = useState(true);
    const [suggest, setSuggest] = useState(true);

    // TODO
    useEffect(() => {
        console.group('Update setting...');
        console.log('🚀 ~ Manage ~ allowAddByPhone:', allowAddByPhone);
        console.log('🚀 ~ Manage ~ qrCode:', qrCode);
        console.log('🚀 ~ Manage ~ commonGroup:', commonGroup);
        console.log('🚀 ~ Manage ~ suggest:', suggest);
        console.groupEnd();
    }, [allowAddByPhone, qrCode, commonGroup, suggest]);

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('contacts.friend-request.manage-title')}
            </Modal.Header>

            <div className="px-2 ex:px-3 sm:px-4 py-2">
                <div className=" flex items-center justify-between gap-2">
                    <div>
                        <div className="text-sm">{t('contacts.friend-request.add-by-phone-number')}</div>
                        <span className="text-ss text-secondary dark:text-dark-secondary">
                            {user._id}
                            {/* {user.dialling_code} */}
                            {/* {user.phone.length === 10 ? user.phone.substring(1) : user.phone} */}
                        </span>
                    </div>
                    <Switch className="flex-shrink-0" checked={allowAddByPhone} onChange={setAllowAddByPhone} />
                </div>

                <Seperate />

                <div className=" flex flex-col gap-2">
                    <h6 className="text-sm font-medium text-primary-color">
                        {t('contacts.friend-request.allow-stranger')}
                    </h6>
                    <p className="text-ss text-secondary dark:text-dark-secondary">
                        {t('contacts.friend-request.allow-stranger-desc')}
                    </p>
                    <FormControlLabel
                        control={<Checkbox checked={qrCode} onChange={setQrCode} />}
                        label={t('contacts.friend-request.my-qr')}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={commonGroup} onChange={setCommonGroup} />}
                        label={t('contacts.friend-request.common-group')}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={suggest} onChange={setSuggest} />}
                        label={t('contacts.friend-request.suggest')}
                    />
                </div>
            </div>
        </>
    );
};

Manage.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Manage;
