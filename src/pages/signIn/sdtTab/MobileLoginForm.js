import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MobileIcon } from '~/assets';
import Button from '~/components/button';
import PhoneSelect from '~/components/phoneSelect';
import UnderlineInput from '~/components/underlineInput';

const MobileLoginForm = ({ value, onBack = () => {} }) => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState(value);
    const [country, setCountry] = useState();

    const handleSubmit = () => {
        console.group('MobileLoginForm');
        console.log(`phone`, phone);
        console.log(`country`, country);
        console.groupEnd('MobileLoginForm');
    };

    return (
        <div>
            <UnderlineInput
                more={<PhoneSelect onChange={setCountry} />}
                Icon={MobileIcon}
                value={phone}
                onChangeText={setPhone}
                placeholder={t('login.phone-number')}
                type="tel"
            />
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
    value: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};
export default MobileLoginForm;
