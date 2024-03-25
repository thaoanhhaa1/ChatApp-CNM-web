import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { saveToken } from '~/api/axiosClient';
import Button from '~/components/button';
import FormControl from '~/components/formControl';
import Languages from '~/components/languages';
import PhoneSelect from '~/components/phoneSelect';
import RadioGroup from '~/components/radioGroup';
import UnderlineInput from '~/components/underlineInput';
import config from '~/config';
import routes from '~/config/routes';
import { genders } from '~/constants';
import { setUser } from '~/features/user/userSlice';
import { useBoolean } from '~/hooks';
import { register } from '~/services';
import { classNames } from '~/utils';

const NUMBER_OF_STEP = 4;

const Register = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        gender: 'male',
        dateOfBirth: '',
        country: {},
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const termRef = useRef();
    const socialTermRef = useRef();
    const gendersTranslation = useMemo(() => genders.map((gender) => ({ ...gender, label: t(gender.label) })), [t]);
    const { value: terms, toggle: toggleTerms } = useBoolean();
    const disabled = useMemo(() => {
        const { name, phone, password } = formData;

        if (currentStep === 1) return name.length < 2;
        if (currentStep === 2)
            return phone.length < 6 || !termRef?.current?.checked || !socialTermRef?.current?.checked;
        if (currentStep === 3) return password.length < 6;

        return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, formData, terms]);

    const [errors, setErrors] = useState({});

    const nextStep = () => {
        const validationErrors = validateFormFields(currentStep);
        if (Object.keys(validationErrors).length === 0) {
            setCurrentStep(currentStep + 1);
        } else {
            setErrors(validationErrors);
        }
    };

    const validateFormFields = (step) => {
        const validationErrors = {};

        if (step === 1 && !validator.matches(formData.name, /^[a-zA-ZÀ-ỹ\s]{2,40}$/))
            validationErrors.name = 'Tên Zalo phải có ít nhất 2-40 kí tự.';

        if (step === 2 && !validator.isMobilePhone(formData.phone, 'vi-VN'))
            validationErrors.phone = 'Số điện thoại không hợp lệ.';

        if (step === 3 && !validator.isLength(formData.password, { min: 6, max: undefined }))
            validationErrors.password = 'Mật khẩu có ít nhất 6 kí tự';

        if (step === 4) {
            if (!formData.dateOfBirth) {
                validationErrors.dateOfBirth = 'Ngày sinh là bắt buộc.';
            } else {
                const currentDate = new Date();
                const dateOfBirth = new Date(formData.dateOfBirth);
                const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
                if (age < 14) validationErrors.dateOfBirth = 'Bạn phải đủ 14 tuổi.';
            }
        }
        console.log(validationErrors);

        return validationErrors;
    };

    const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

    const handleChangeCountry = useCallback((country) => setFormData((prev) => ({ ...prev, country })), []);

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
        const validationErrors = validateFormFields(currentStep);

        if (Object.keys(validationErrors).length) {
            // TODO Handle validate
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await register(formData);
            const { accessToken, user } = res.data;

            saveToken(accessToken);
            dispatch(setUser(user));
            navigation(routes.chats);
        } catch (error) {
            setErrors({
                ...errors,
                dateOfBirth: error.response.data.error.message,
            });
        }

        setLoading(false);
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden px-2">
            <h1 className="text-4xl text-primary-color font-bold mb-10">Zalo</h1>
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
                            label={t('register.phone')}
                            control={
                                <UnderlineInput
                                    placeholder={t('register.phone-placeholder')}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    type="tel"
                                    more={<PhoneSelect onChange={handleChangeCountry} />}
                                />
                            }
                            error={errors.phone}
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
                        <Button
                            align="left"
                            small
                            className="hover:underline hover:text-hoverPurple"
                            to={config.routes.signIn}
                        >
                            {t('register.sign-in')}
                        </Button>
                    ) : (
                        <Button primary disabled={currentStep <= 1 || loading} onClick={prevStep}>
                            {t('register.back')}
                        </Button>
                    )}

                    {currentStep < 4 ? (
                        <Button disabled={disabled} primary onClick={nextStep}>
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

export default Register;
