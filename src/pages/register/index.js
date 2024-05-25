import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import { saveToken } from '~/api/axiosClient';
import images from '~/assets/images';
import Button from '~/components/button';
import FormControl from '~/components/formControl';
import Input from '~/components/input';
import Languages from '~/components/languages';
import Modal from '~/components/modal';
import RadioGroup from '~/components/radioGroup';
import UnderlineInput from '~/components/underlineInput';
import config from '~/config';
import routes from '~/config/routes';
import { genders } from '~/constants';
import { setSetting } from '~/features/localSetting/localSettingSlice';
import { setUser } from '~/features/user/userSlice';
import { useBoolean } from '~/hooks';
import authServices from '~/services/auth.service';
import { classNames } from '~/utils';

const NUMBER_OF_STEP = 4;
const TIME_OTP = 300;

const Register = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        gender: 'male',
        dateOfBirth: '',
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const termRef = useRef();
    const socialTermRef = useRef();
    const gendersTranslation = useMemo(() => genders.map((gender) => ({ ...gender, label: t(gender.label) })), [t]);
    const { value: terms, toggle: toggleTerms } = useBoolean();
    const disabled = useMemo(() => {
        const { name, email, password } = formData;

        if (currentStep === 1) return name.length < 2;
        if (currentStep === 2)
            return email.length < 1 || !termRef?.current?.checked || !socialTermRef?.current?.checked;
        if (currentStep === 3) return password.length < 2;

        return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, formData, terms]);

    const [errors, setErrors] = useState({});
    const [otpCode, setOtpCode] = useState('');
    const [countdown, setCountdown] = useState(TIME_OTP);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false); // Đảo ngược trạng thái hiển thị của modal

    const handleSendOTP = async () => {
        try {
            await authServices.createOTP({ contact: formData.email });
            setCountdown(TIME_OTP);
        } finally {
        }
    };

    const handleAuthentication = async () => {
        setLoading(true);

        try {
            if (!otpCode) throw new Error('OTP code is required');

            await authServices.verifyOTP({
                contact: formData.email,
                otp: otpCode,
            });

            setCurrentStep(currentStep + 1);
        } catch (error) {
            setErrors({
                otpCode: t('register.error-otp-code'),
            });
        } finally {
            setLoading(false);
        }
    };
    const nextStep = async () => {
        setLoading(true);

        const validationErrors = await validateFormFields(currentStep);

        setLoading(false);
        if (Object.keys(validationErrors).length === 0) {
            if (currentStep === 2) {
                setShowModal(true); // Show modal on step 2
            } else {
                setCurrentStep(currentStep + 1);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateFormFields = async (step) => {
        const validationErrors = {};
        const { name, email, password } = formData;

        if (step === 1) {
            if (name?.length < 2) validationErrors.name = t('register.zalo-name-validate-min-length');
            else if (name?.length > 40) validationErrors.name = t('register.zalo-name-validate-max-length');
            else if (!validator.matches(name, /^[^!@#$%^&*(),.?":{}|<>]*$/))
                validationErrors.name = t('register.zalo-name-validate-special-character');
            else if (!validator.matches(name, /^[^0-9]*$/))
                validationErrors.name = t('register.zalo-name-validate-number-character');
        }

        if (step === 2) {
            if (!validator.isEmail(email)) validationErrors.email = t('register.error-email');
            else {
                try {
                    await authServices.createOTP({ contact: email });
                } catch (error) {
                    validationErrors.email = t('register.email-exist');
                }
            }
        }

        if (step === 3) {
            if (password?.length < 6) validationErrors.password = t('register.password-validate-min-length');
            else if (password?.length > 30) validationErrors.password = t('register.password-validate-max-length');
            else if (!validator.matches(password, /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/))
                validationErrors.password = t('register.error-password');
        }

        if (step === 4) {
            const currentDate = new Date();
            const dateOfBirth = new Date(formData.dateOfBirth);
            const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
            if (age < 14) validationErrors.dateOfBirth = t('register.dob-validate');
        }

        return validationErrors;
    };

    const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        const validationErrors = await validateFormFields(currentStep);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await authServices.register({
                ...formData,
                contact: formData.email,
            });
            const { accessToken, user } = res.data;

            saveToken(accessToken);
            dispatch(setUser(user));
            dispatch(setSetting({ loginAt: new Date().toISOString() }));
            navigation(routes.chats);
        } catch (error) {
            setErrors({
                ...errors,
                dateOfBirth: error.response.data.error.message,
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        let interval;
        if (showModal) {
            interval = setInterval(() => {
                setCountdown((prev) => Math.max(0, prev - 1));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showModal]);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden px-2">
            <h1 className="text-4xl text-primary-color font-bold mb-10">Lola</h1>
            <div className="max-w-[400px] w-full bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className="flex justify-center items-center mb-4">
                    {new Array(NUMBER_OF_STEP).fill(null).map((_, i) => (
                        <Fragment key={i}>
                            <div
                                className={classNames(
                                    `w-[35px] font-semibold text-white rounded-full h-[35px] flex justify-center items-center`,
                                    currentStep - 1 > i ? 'bg-primary-color' : 'bg-slate-400',
                                )}
                            >
                                {i + 1}
                            </div>
                            {i !== NUMBER_OF_STEP - 1 && (
                                <div
                                    className={classNames(
                                        'w-[40px] h-[2px]',
                                        currentStep - 1 > i ? 'bg-primary-color' : 'bg-slate-400',
                                    )}
                                />
                            )}
                        </Fragment>
                    ))}
                </div>
                {currentStep === 1 && (
                    <div>
                        <FormControl
                            label={t('register.zalo-name')}
                            control={
                                <UnderlineInput
                                    placeholder={t('register.zalo-name-placeholder')}
                                    onChange={handleChange}
                                    value={formData.name}
                                    name="name"
                                />
                            }
                            error={errors.name}
                        />
                        <div className="text-mm text-secondary">
                            <p className="mt-2">{t('register.zalo-name-attention-1')}:</p>
                            <p className="">
                                - {t('register.zalo-name-attention-2')}{' '}
                                <a
                                    href="https://help.zalo.me/huong-dan/chuyen-muc/bao-mat-va-rieng-tu/quy-dinh-dat-ten-nguoi-dung-tren-zalo"
                                    className="text-primary-color"
                                >
                                    {t('register.zalo-name-attention-2-1')}
                                </a>{' '}
                                <br />- {t('register.zalo-name-attention-3')} <br />
                            </p>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <FormControl
                            label={t('register.email')}
                            control={
                                <UnderlineInput
                                    type="email"
                                    placeholder={t('register.email-placeholder')}
                                    onChange={handleChange}
                                    value={formData.email}
                                    name="email"
                                />
                            }
                            error={errors.email}
                        />
                        <div className="flex items-center mb-4 mt-4 text-mm text-secondary dark:text-gray-300">
                            <input
                                onChange={toggleTerms}
                                ref={termRef}
                                id="default-checkbox-1"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 rounded"
                            />
                            <label htmlFor="default-checkbox" className="ms-2 font-medium">
                                {t('register.phone-checkbox-1')}{' '}
                                <a href="https://zalo.vn/dieukhoan/" className="text-primary-color">
                                    {t('register.phone-checkbox-1-1')}
                                </a>
                            </label>
                        </div>
                        <div className="flex items-center mb-4 mt-4 text-mm text-secondary dark:text-gray-300">
                            <input
                                onChange={toggleTerms}
                                ref={socialTermRef}
                                id="default-checkbox-2"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 rounded"
                            />
                            <label htmlFor="default-checkbox" className="ms-2 font-medium">
                                {t('register.phone-checkbox-1')}{' '}
                                <a href="https://zalo.vn/dieukhoan/" className="text-primary-color">
                                    {t('register.phone-checkbox-1-2')}
                                </a>
                            </label>
                        </div>

                        <Modal className="p-10" show={showModal} onClickOutside={handleClose}>
                            <div className="text-center flex flex-col items-center gap-2 justify-center">
                                <img src={images.imageVerify} alt="" className="w-[140px] aspect-square mb-6" />
                                <h3 className="font-semibold text-2xl">{t('register.confirm')}</h3>
                                <p className="text-secondary dark:text-dark-secondary text-sm">
                                    {t('register.confirm-desc')}
                                </p>
                                <p className="text-sm">
                                    {t('register.countdown')}: &nbsp;
                                    {countdown}
                                    &nbsp;
                                    {t('register.second')}
                                </p>
                                <div className="px-[15px] pt-[18px] pb-3 w-[300px]">
                                    <FormControl
                                        control={
                                            <Input
                                                maxLength={6}
                                                value={otpCode}
                                                onChangeText={setOtpCode}
                                                type="number"
                                                className="text-center"
                                                placeholder={t('register.enter-confirm')}
                                                outline
                                            />
                                        }
                                        error={errors.otpCode}
                                    />
                                </div>
                                <Button
                                    disabled={loading || !countdown}
                                    loading={loading}
                                    className="w-[280px] mt-2 uppercase"
                                    primary
                                    onClick={handleAuthentication}
                                >
                                    {t('register.confirm')}
                                </Button>
                                <p className="text-sm mt-2">
                                    <span className="text-secondary dark:text-dark-secondary">
                                        {t('register.not-receive')}
                                    </span>
                                    &nbsp;
                                    <span
                                        onClick={handleSendOTP}
                                        className="text-primary-color hover:underline cursor-pointer"
                                    >
                                        {t('register.resend')}
                                    </span>
                                </p>
                            </div>
                        </Modal>
                    </div>
                )}
                {currentStep === 3 && (
                    <FormControl
                        label={t('register.password')}
                        control={
                            <UnderlineInput
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder={t('register.password-placeholder')}
                            />
                        }
                        error={errors.password}
                    />
                )}

                {currentStep === 4 && (
                    <div>
                        <RadioGroup
                            name="gender"
                            data={gendersTranslation}
                            label={t('register.gender')}
                            onChange={handleChange}
                            value={formData.gender}
                        />
                        <FormControl
                            label={t('register.birthday')}
                            error={errors.dateOfBirth}
                            control={
                                <UnderlineInput
                                    name={'dateOfBirth'}
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    type="date"
                                />
                            }
                        />
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    {currentStep === 1 ? (
                        <Button align="left" small text to={config.routes.signIn}>
                            {t('register.sign-in')}
                        </Button>
                    ) : (
                        <Button primary disabled={currentStep <= 1 || loading} onClick={prevStep}>
                            {t('register.back')}
                        </Button>
                    )}

                    {currentStep < 4 ? (
                        <Button disabled={disabled || loading} loading={loading} primary onClick={nextStep}>
                            {t('register.next')}
                        </Button>
                    ) : (
                        <Button
                            disabled={!formData.dateOfBirth || loading}
                            primary
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            {t('register.register')}
                        </Button>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 -z-10 bg-sidebar-item-active-bg" />
            <Languages />
        </div>
    );
};

Register.propTypes = {};

export default withErrorBoundary(Register, {
    fallback: null,
    onError: (error, info) => {
        toast.error('Register::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
