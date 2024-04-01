import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { LockIcon } from '~/assets';
import Button from '~/components/button';
import UnderlineInput from '~/components/underlineInput';

const UpdatePasswordForm = ({ sdt}) => {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirm = () => {
        console.group(`UpdatePasswordForm`);
        // console.log(`country`, country);
        console.log(`sdt`, sdt);
        console.log(`password`, password);
        console.groupEnd();

        if (!validator.isLength(password, { min: 6, max: undefined })) setError(t('register.error-password'));
        else if (password !== confirmPassword) {
            setError(t('register.error-password-01'));
        } else {
            console.log('updating password');
            setError('')
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-center px-10 py-4 rounded-lg bg-primary-color bg-opacity-10 mb-3">
                <p className="mb-1 text-ss">{t('login.send-message-to-get-code')}</p>
                <p className="mb-1 text-hoverPurple text-xl font-bold">
                     {sdt}
                </p>
                <div className="px-[15px] pt-[18px] pb-3">
                    <UnderlineInput align="center" placeholder={t('login.enter-activation-code')} />
                </div>
                {/* <p className="text-xs mt-3">{t('login.description-get-code')}</p> */}
            </div>

            <UnderlineInput
                containerClassName="w-full mb-3"
                Icon={LockIcon}
                value={password}
                onChangeText={setPassword}
                type="password"
                placeholder={t('login.forget-password-enter-password')}
            />
            <UnderlineInput
                containerClassName="w-full mb-[30px]"
                Icon={LockIcon}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                type="password"
                placeholder={t('login.forget-password-reenter-password')}
            />

            {error && (
                <div className="w-full rounded-sm text-xs font-medium text-[#b64848] bg-[#ffe7e7] p-[15px] mb-6">
                    {error}
                </div>
            )}

            <Button className="hover:bg-hoverPurple w-full" primary onClick={handleConfirm} disabled={password.length < 6}>
                {t('login.confirm')}
            </Button>
        </div>
    );
};
UpdatePasswordForm.propTypes = {
    sdt: PropTypes.string.isRequired,
};
export default UpdatePasswordForm;
