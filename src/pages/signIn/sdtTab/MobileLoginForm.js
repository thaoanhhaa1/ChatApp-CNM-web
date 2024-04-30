import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { EmailIcon } from '~/assets';
import Button from '~/components/button';
import UnderlineInput from '~/components/underlineInput';
import { useBoolean } from '~/hooks';

const MobileLoginForm = ({ sdt, onBack = () => {} }) => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState(sdt);
    // const [country, setCountry] = useState();
    const { value, setFalse, setTrue } = useBoolean();

    const handleSubmit = () => {
        setFalse();
        // if (!validator.isMobilePhone(phone, 'vi-VN')) setTrue();
        if (!validator.isEmail(phone)) setTrue();

        console.group('MobileLoginForm');
        console.log(`phone`, phone);
        // console.log(`country`, country);
        console.groupEnd('MobileLoginForm');
    };

    return (
        <div>
            <UnderlineInput
                // more={<PhoneSelect onChange={setCountry} />}
                Icon={EmailIcon}
                value={phone}
                onChangeText={setPhone}
                placeholder={t('login.phone-number')}
                type="email"
            />
            {value && (
                <div className="rounded-sm text-xs font-medium text-[#b64848] bg-[#ffe7e7] p-[15px] mt-4">
                    {t('login.error-forget-password')}
                </div>
            )}
            <div className="text-center text-ss ml-6 mr-6 mt-4">
                <p className="text-secondary dark:text-secondary">{t('login.login-by-mobile-desc')}</p>
            </div>
            <Button
                disabled={phone.length < 6}
                onClick={handleSubmit}
                className="w-full hover:bg-hoverPurple mt-5"
                primary
            >
                {t('login.agree')}
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
        </div>
    );
};
MobileLoginForm.propTypes = {
    sdt: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default MobileLoginForm;
