import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { EmailIcon } from '~/assets';
import Button from '~/components/button';
import UnderlineInput from '~/components/underlineInput';
import { useBoolean } from '~/hooks';
import UpdatePasswordForm from './UpdatePasswordForm';
import { sendOTPForgotPassword } from '~/services';


const ForgotPasswordForm = ({ sdt, onBack = () => {} }) => {
    const { t } = useTranslation();
    const [showUpdatePass, setShowUpdatePass] = useState(false);
    const [phone, setPhone] = useState(sdt);
    const [country, setCountry] = useState();
    const { value, setFalse, setTrue } = useBoolean();
    const [loading, setLoading] = useState(false);


    const handleContinue = async() => {
        setFalse();

        if (!validator.matches(phone, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) setTrue();
        else {
            try {
                const response = await sendOTPForgotPassword(phone);
                console.log(response.data); 
                setShowUpdatePass(true);
            } catch (error) {    
                console.error('Lỗi khi tạo mã OTP:', error);
                
            }
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
                        // more={<PhoneSelect onChange={setCountry} />}
                        type="email"
                        Icon={EmailIcon}
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
