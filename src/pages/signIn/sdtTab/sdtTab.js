import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LockIcon, MobileIcon } from '~/assets';
import Button from '~/components/button';
import PhoneSelect from '~/components/phoneSelect';
import UnderlineInput from '~/components/underlineInput';
import config from '~/config';
import { setSetting } from '~/features/localSetting/localSettingSlice';
import { setUser } from '~/features/user/userSlice';
import { useBoolean } from '~/hooks';
import { login } from '~/services';
import { token } from '~/utils';
import ForgotPasswordForm from './ForgotPasswordForm';
import MobileLoginForm from './MobileLoginForm';

const SdtTab = () => {
    const { t } = useTranslation();
    const [showMobileLoginForm, setShowMobileLoginForm] = useState(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const { value: showError, setFalse: setHideError, setTrue: setShowError } = useBoolean(false);
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async () => {
        setHideError();
        setLoading(true);

        console.group(`handleSubmit`);

        console.log(`country`, country);
        console.log(`phone`, phone);
        console.log(`password`, password);

        console.groupEnd();

        // TODO Validate

        try {
            const res = await login({ country, phone, password });
            const { accessToken, user } = res.data;

            token.set(accessToken);
            dispatch(setUser(user));
            dispatch(setSetting({ loginAt: new Date().toISOString() }));
            navigation(config.routes.chats);
        } catch (error) {
            setShowError();
        } finally {
            setLoading(false);
        }
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
                            loading={loading}
                            disabled={phone.length < 6 || password.length < 6 || loading}
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
                        <div className="flex justify-between items-center">
                            <Button
                                small
                                className="w-full hover:underline hover:text-hoverPurple"
                                to={config.routes.register}
                                align="left"
                            >
                                {t('login.register')}
                            </Button>
                            <Button
                                small
                                onClick={handleClickForgetPassword}
                                className="w-full hover:underline hover:text-hoverPurple"
                                align="right"
                            >
                                {t('login.forgot-password')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
            {showMobileLoginForm && <MobileLoginForm sdt={phone} onBack={handleBackToLoginPasswordForm} />}

            {showForgotPasswordForm && <ForgotPasswordForm sdt={phone} onBack={handleBackToLoginPasswordForm} />}
        </div>
    );
};

SdtTab.propTypes = {};

export default SdtTab;
