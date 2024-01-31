import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import api, { axiosClient } from '~/api';
import { saveToken } from '~/api/axiosClient';
import Button from '~/components/button';
import FormGroup from '~/components/formGroup';
import RadioGroup from '~/components/radioGroup';
import routes from '~/config/routes';
import { setUser } from '~/features/user/userSlice';
import { classNames } from '~/utils';

const genders = [
    {
        label: 'Nam',
        value: 'male',
    },
    {
        label: 'Nữ',
        value: 'female',
    },
];

const NUMBER_OF_STEP = 4;

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        gender: 'male',
        dateOfBirth: '',
    });

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
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await axiosClient.post(api.register(), formData);

                saveToken(res.data.accessToken);
                dispatch(setUser(res.data.user));
                navigation(routes.chats);
            } catch (error) {
                setErrors({
                    ...errors,
                    dateOfBirth: error.response.data.error.message,
                });
            }
        } else {
            setErrors(validationErrors);
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
                        <FormGroup
                            required
                            placeholder="Gồm 2-40 kí tự"
                            label="Tên zalo"
                            error={errors.name}
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <div className="text-mm text-secondary">
                            <p className="mt-2">Lưu ý khi đặt tên</p>
                            <p className="">
                                - Không vi phạm{' '}
                                <a
                                    href="https://help.zalo.me/huong-dan/chuyen-muc/bao-mat-va-rieng-tu/quy-dinh-dat-ten-nguoi-dung-tren-zalo"
                                    className="text-primary-color"
                                >
                                    quy định đặt tên trên Zalo
                                </a>{' '}
                                <br />
                                - Nên sử dụng tên thật để giúp bạn bè nhận ra bạn <br />
                            </p>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <FormGroup
                            label="Số điện thoại"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                        />
                        <div className="flex items-center mb-4 mt-4 text-mm text-secondary dark:text-gray-300">
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 rounded" />
                            <label htmlFor="default-checkbox" className="ms-2 font-medium">
                                Tôi đồng ý với các{' '}
                                <a href="https://zalo.vn/dieukhoan/" className="text-primary-color">
                                    điều khoản sử dụng Zalo
                                </a>
                            </label>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <FormGroup
                        error={errors.password}
                        label="Mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                )}

                {currentStep === 4 && (
                    <div>
                        <RadioGroup
                            name="gender"
                            data={genders}
                            label="Giới tính"
                            onChange={handleChange}
                            value={formData.gender}
                        />
                        <FormGroup
                            error={errors.dateOfBirth}
                            label="Ngày sinh"
                            name={'dateOfBirth'}
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            type="date"
                            required
                        />
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <Button primary disabled={currentStep <= 1 || loading} onClick={prevStep}>
                        Quay lại
                    </Button>
                    {currentStep < 4 ? (
                        <Button primary onClick={nextStep}>
                            Kế tiếp
                        </Button>
                    ) : (
                        <Button primary onClick={handleSubmit} disabled={loading} loading={loading}>
                            Đăng ký
                        </Button>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 -z-10 bg-sidebar-item-active-bg" />
        </div>
    );
};

Register.propTypes = {};

export default Register;
