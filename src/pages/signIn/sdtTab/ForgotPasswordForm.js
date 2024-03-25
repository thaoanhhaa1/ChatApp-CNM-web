import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MobileIcon } from '~/assets';
import Button from '~/components/button';
import PhoneSelect from '~/components/phoneSelect';
import UnderlineInput from '~/components/underlineInput';
import { useBoolean } from '~/hooks';
import UpdatePasswordForm from './UpdatePasswordForm';
import validator from 'validator';

const ForgotPasswordForm = ({sdt, onBack = () => {} }) => {
    const { t } = useTranslation();
    const [showUpdatePass, setShowUpdatePass] = useState(false);
    const [phone, setPhone] = useState(sdt);
    const [country, setCountry] = useState();
    const { value, setFalse, setTrue } = useBoolean();

    const handleContinue = () => {
        setFalse();
        console.group(`handleSubmit`);

        console.log(`country`, country);
        console.log(`phone`, phone);

        console.groupEnd();

        if (!validator.isMobilePhone(phone, 'vi-VN')) {
            setTrue();
        } else {
            setShowUpdatePass(true);
        }
    };

    return (
        <div>
            {!showUpdatePass ? (
                <>
                    <div className="flex items-center justify-center mb-[30px]">
                        <p>{t('login.enter-phone-number')}</p>
                    </div>
                    <UnderlineInput
                        containerClassName="mb-[18px]"
                        value={phone}
                        onChangeText={setPhone}
                        more={<PhoneSelect onChange={setCountry} />}
                        type="tel"
                        Icon={MobileIcon}
                        placeholder={t('login.phone-number')}
                    />

                    {value && (
                        <div className="rounded-sm text-xs font-medium text-[#b64848] bg-[#ffe7e7] p-[15px] mb-6">
                            {t('login.error-forget-password')}
                        </div>
                    )}

                    <Button
                        disabled={phone.length < 6}
                        className="w-full hover:bg-hoverPurple"
                        primary
                        onClick={handleContinue}
                    >
                        {t('login.continue')}
                    </Button>
                    <div className="mt-3">
                        <span
                            onClick={onBack}
                            className="text-ss cursor-pointer transition-colors hover:underline hover:text-primary-color"
                        >
                            &#171; &nbsp;
                            {t('login.back')}
                        </span>
                    </div>
                </>
            ) : (
                <div>
                    <UpdatePasswordForm sdt={phone} country={country} />
                </div>
            )}
        </div>
    );
};

ForgotPasswordForm.propTypes = {
    sdt: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
