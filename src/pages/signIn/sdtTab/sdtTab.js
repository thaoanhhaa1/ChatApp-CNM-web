import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LockIcon, MobileIcon } from '~/assets';
import Button from '~/components/button';
import PhoneSelect from '~/components/phoneSelect';
import UnderlineInput from '~/components/underlineInput';
import { useBoolean } from '~/hooks';
import ForgotPasswordForm from './ForgotPasswordForm';
import MobileLoginForm from './MobileLoginForm';

const SdtTab = () => {
    const { t } = useTranslation();
    const [showMobileLoginForm, setShowMobileLoginForm] = useState(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const { value: showError, setFalse: setHideError } = useBoolean(false);
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleShowMobileLoginForm = () => {
        setShowMobileLoginForm(true);
        setShowForgotPasswordForm(false); // Ẩn form quên mật khẩu nếu đang hiển thị
    };

    const handleShowForgotPasswordForm = () => {
        setShowForgotPasswordForm(true);
        setShowMobileLoginForm(false); // Ẩn form đăng nhập bằng thiết bị di động nếu đang hiển thị
    };

    const handleBackToLoginPasswordForm = () => {
        setShowMobileLoginForm(false);
        setShowForgotPasswordForm(false);
    };
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChangePhone = (phone) => {
        setFormData({
            ...formData,
            phone: phone,
        });
        setErrors({
            ...errors,
            phone: undefined, // Xóa thông báo lỗi khi người dùng thay đổi giá trị
        });
    };

    const handleSubmit = () => {
        setHideError();

        console.group(`handleSubmit`);

        console.log(`country`, country);
        console.log(`phone`, phone);
        console.log(`password`, password);

        console.groupEnd();

        // Check phone and pass
        // Đúng ==> Login
        // Sai ==> show error
    };

    const handleClickForgetPassword = () => {
        handleSubmit();
        handleShowForgotPasswordForm();
    };

    const handleClickSignInWithMobile = () => {
        handleSubmit();
        handleShowMobileLoginForm();
    };

    return (
        <div>
            {!showMobileLoginForm && !showForgotPasswordForm && (
                <>
                    <div className="flex flex-col gap-[18px]">
                        <UnderlineInput
                            value={phone}
                            onChangeText={setPhone}
                            more={<PhoneSelect onChange={setCountry} />}
                            type="tel"
                            Icon={MobileIcon}
                            placeholder={t('login.phone-number')}
                        />
                        <UnderlineInput
                            containerClassName="mb-[18px]"
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                            Icon={LockIcon}
                            placeholder={t('login.password')}
                        />
                        {showError ? (
                            <span className="text-ss leading-normal text-[#DD4B39]">{t('login.error')}</span>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-3 mt-2.5">
                        <Button
                            disabled={phone.length < 6 || password.length < 6}
                            onClick={handleSubmit}
                            className="w-full hover:bg-hoverPurple"
                            primary
                        >
                            {t('login.login-with-password')}
                        </Button>
                        <Button
                            disabled={phone.length < 6}
                            onClick={handleClickSignInWithMobile}
                            className="w-full border border-1 border-gray-500 hover:border-hoverPurple !text-primary-color"
                        >
                            {t('login.sign-in-with-mobile')}
                        </Button>
                        <Button
                            small
                            onClick={handleClickForgetPassword}
                            className="w-full hover:underline hover:text-hoverPurple"
                        >
                            {t('login.forgot-password')}
                        </Button>
                    </div>
                </>
            )}
            {showMobileLoginForm && (
                <MobileLoginForm
                    value={formData.phone}
                    onChange={handleChangePhone}
                    error={errors.phone}
                    onBack={handleBackToLoginPasswordForm}
                />
            )}

            {showForgotPasswordForm && <ForgotPasswordForm onBack={handleBackToLoginPasswordForm} />}
        </div>
    );
};

SdtTab.propTypes = {};

export default SdtTab;
