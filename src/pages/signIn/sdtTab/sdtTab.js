import { useState } from "react";
import validator from "validator";
import { LockIcon, MobileIcon } from "~/assets";
import FormLogin from "~/components/Sigin/formLogin";
import Button from "~/components/button";
import MobileLoginForm from "./MobileLoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";


const SdtTab = () => {
    const [showMobileLoginForm, setShowMobileLoginForm] = useState(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [showLoginPasswordForm, setShowLoginPasswordForm] = useState(false);

    const handleShowMobileLoginForm = () => {
        setShowMobileLoginForm(true);
        setShowForgotPasswordForm(false); // Ẩn form quên mật khẩu nếu đang hiển thị
    };

    const handleShowForgotPasswordForm = () => {
        setShowForgotPasswordForm(true);
        setShowMobileLoginForm(false); // Ẩn form đăng nhập bằng thiết bị di động nếu đang hiển thị
    };

    const handleBackToLoginPasswordForm = () => {
        setShowLoginPasswordForm(true);
        setShowMobileLoginForm(false);
        setShowForgotPasswordForm(false);
    };
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            password: undefined, // Xóa thông báo lỗi khi người dùng thay đổi giá trị
        });
    };

    const validateFormData = () => {
        const { phone, password } = formData;
        const errors = {};

        if (!validator.isMobilePhone(phone, 'vi-VN')) {
            errors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!validator.isLength(password, { min: 6, max: undefined }))
            errors.password = 'Mật khẩu có ít nhất 6 kí tự';

        return errors;
    };

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
        // e.preventDefault();
        // Validate form data
        const validationErrors = validateFormData();
        setErrors(validationErrors);

        // Check if there are no validation errors
        if (Object.keys(validationErrors).length === 0) {
            // Perform login action
            // Example: send data to server, authenticate user, etc.
            console.log('Form submitted successfully');
        } else {
            // If there are validation errors, do something (e.g., display error messages)
            console.log('Form contains errors');
        }
    };

    return (
        <div className="mt-10">
            {!showMobileLoginForm && !showForgotPasswordForm && (
                <>
                    <FormLogin
                        name="phone"
                        icon={MobileIcon}
                        value={formData.phone}
                        onChange={handleChangePhone}
                        error={errors.phone}

                    />
                    <FormLogin
                        input
                        type='password'
                        name="password"
                        icon={LockIcon}
                        value={formData.password}
                        onChange={handleChangePassword}
                        error={errors.password}
                        placeholder="Mật khẩu"
                    />
                    <Button onClick={handleSubmit} className='w-full hover:bg-hoverPurple mt-5' primary>Đăng nhập với mật khẩu</Button>
                    <Button onClick={() => { handleSubmit(); handleShowMobileLoginForm(); }} className='w-full border border-1 border-gray-500 mt-3 hover:border-hoverPurple'>Đăng nhập bằng thiết bị di động</Button>
                    <Button onClick={() => { handleSubmit(); handleShowForgotPasswordForm(); }} className="w-full hover:underline hover:text-hoverPurple">Quên mật khẩu?</Button>
                </>
            )}
            {showMobileLoginForm && (
                <MobileLoginForm
                    value={formData.phone}
                    onChange={handleChangePhone}
                    error={errors.phone}
                    onClick={handleBackToLoginPasswordForm}
                />
            )}

            {showForgotPasswordForm && (
                <ForgotPasswordForm
                    value={formData.phone}
                    onChange={handleChangePhone}
                    error={errors.phone}
                    onClick={handleBackToLoginPasswordForm}
                />
            )}
        </div>
    );
}
SdtTab.propTypes = {}
export default SdtTab;