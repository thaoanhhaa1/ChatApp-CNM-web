import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { LockIcon } from '~/assets';
import Button from '~/components/button';
import FormControl from '~/components/formControl';
import UnderlineInput from '~/components/underlineInput';
import config from '~/config';
import routes from '~/config/routes';
import { setSetting } from '~/features/localSetting/localSettingSlice';
import { setUser } from '~/features/user/userSlice';

import { login, verifyOTPForgotPassword } from '~/services';
import { token } from '~/utils';


const UpdatePasswordForm = ({ sdt }) => {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const navigation = useNavigate();
    const dispatch = useDispatch();


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'otpCode') {
            setOtpCode(value);
            if (!value) setErrors({...errors, otpCode: t('register.error-otp-code1') });
            else {
                setErrors({ ...errors, otpCode: '' });
            }
        } else if (name === 'password') {
            setPassword(value);
            if (!validator.matches(password, /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/)) {
                setErrors({...errors, password: t('register.error-password') });
            }
            else {
                setErrors({ ...errors, password: '' });
            }
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }

    const handleConfirm = async () => {
        if (!errors.password && !errors.otpCode) {
            if (password !== confirmPassword) {
                setErrors({...errors, confirmPassword: t('register.error-password-01') });
            } else{
            try {
                setErrors("");
                console.log(sdt, otpCode, password);
                await verifyOTPForgotPassword({ contact: sdt, otp: otpCode, password: password });
                
                const res = await login({ contact: sdt, password });
                const { accessToken, user } = res.data;
                token.set(accessToken);
                dispatch(setUser(user));
                dispatch(setSetting({ loginAt: new Date().toISOString() }));
                navigation(config.routes.chats);

            } catch (error) {
                setErrors({ ...errors, otpCode: t('register.error-otp-code') });
            }
        }}
    };
    
    
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-center px-10 py-4 rounded-lg bg-primary-color bg-opacity-10 mb-3">
                <p className="mb-1 text-ss">{t('login.send-message-to-get-code')}</p>
                <p className="mb-1 text-hoverPurple text-xl font-bold">{sdt}</p>
                <div className="px-[15px] pt-[18px] pb-3">
                    <FormControl
                            control={
                                <UnderlineInput
                                align="center" 
                                placeholder={t('login.enter-activation-code')} 
                                maxLength={6}
                                value={otpCode}
                                // onChangeText={setOtpCode}
                                onChange={handleChange}
                                type="number"
                                name="otpCode"
                                />
                            }
                            error={errors.otpCode}
                        />
                    
                </div>
                {/* <p className="text-xs mt-3">{t('login.description-get-code')}</p> */}
            </div>

            <UnderlineInput
                containerClassName="w-full mb-3"
                Icon={LockIcon}
                value={password}
                // onChangeText={setPassword}
                onChange={handleChange}
                type="password"
                placeholder={t('login.forget-password-enter-password')}
                name="password"
            />
            <UnderlineInput
                containerClassName="w-full mb-[30px]"
                Icon={LockIcon}
                value={confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder={t('login.forget-password-reenter-password')}
                name="confirmPassword"
            />

            {errors.password && (
                <div className="w-full rounded-sm text-xs font-medium text-[#b64848] bg-[#ffe7e7] p-[15px] mb-6">
                    {errors.password}
                </div>
            )}

            {errors.confirmPassword && (
                <div className="w-full rounded-sm text-xs font-medium text-[#b64848] bg-[#ffe7e7] p-[15px] mb-6">
                    {errors.confirmPassword}
                </div>
            )}


            <Button
                className="hover:bg-hoverPurple w-full"
                primary
                onClick={handleConfirm}
                disabled={password.length < 6}
            >
                {t('login.confirm')}
            </Button>
        </div>
    );
};
UpdatePasswordForm.propTypes = {
    sdt: PropTypes.string.isRequired,
};
export default UpdatePasswordForm;
