import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import api, { axiosClient } from '~/api';
import { saveToken } from '~/api/axiosClient';
import { LockIcon, MobileIcon } from '~/assets';
import Button from '~/components/button';
import routes from '~/config/routes';
import { setUser } from '~/features/user/userSlice';
import { classNames } from '~/utils';

const SdtTab = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showMobileLoginForm, setShowMobileLoginForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showLoginPasswordForm, setShowLoginPasswordForm] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const validateFormData = () => {
    const { phone, password } = formData;
    const errors = {};

    if (!validator.isMobilePhone(phone, 'vi-VN')) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Mật khẩu không được bỏ trống';
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const validationErrors = validateFormData();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await api.login(formData);

        const { token, user } = response.data;
        saveToken(token);
        dispatch(setUser(user));
        navigation(routes.chats);
      } catch (error) {
        console.error('Đăng nhập thất bại:', error);
      }
    } else {
      setErrors(validationErrors);
    }

    setLoading(false);
  };



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

  return (
    <div className="flex-col items-center justify-center">
      <form>
        {!showMobileLoginForm && !showForgotPasswordForm && (
          <div>
            {/* Form đăng nhập bằng số điện thoại */}
            <div>
              <div className="flex items-center mb-4 mt-12">
                <label htmlFor="phone" className="mr-2">
                  <MobileIcon className="w-[18px] h-[18px]" />
                </label>
                <PhoneInput
                  id="phone"
                  country="vn"
                  value={formData.phone}
                  onChange={handleChangePhone}
                  inputProps={{ required: true }}
                  name="phone"
                />
              </div>
              {errors && <div className="text-red-500 text-ss mt-1">{errors.phone}</div>}
              <div className="flex items-center mb-2 border-b-2">
                <label htmlFor='password' className="block text-primary text-mm leading-5 font-medium ">
                  <LockIcon className="w-[16px] h-[16px]" />
                </label>
                <input
                  id="password"
                  className="appearance-none rounded w-full py-2 px-3 text-primary text-sm leading-normal focus:outline-none focus:shadow-outline"
                  name='password'
                  value={formData.password}
                  onChange={handleChangePassword}
                  type='password'
                  placeholder='Mật khẩu'
                />
              </div>
              {errors && <div className="text-red-500 text-ss mb-8">{errors.password}</div>}
              <button onClick={handleSubmit} disabled={loading} className='flex items-center mb-4 h-[46px] w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Đăng nhập với mật khẩu</button>
            </div>

            {/* Nút để mở form đăng nhập bằng thiết bị di động */}
            <button onClick={handleShowMobileLoginForm} className='flex items-center h-[46px] w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 border border-gray-300 shadow-sm hover:border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >Đăng nhập bằng thiết bị di động</button>
            {/* Nút để mở form quên mật khẩu */}
            <button onClick={handleShowForgotPasswordForm} className='flex items-center h-[46px] w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 hover:underline hover:text-indigo-500'>Quên mật khẩu?</button>

          </div>
        )}
      </form>


      {/* Form đăng nhập bằng thiết bị di động */}
      {showMobileLoginForm && (
        <form>
          {/* Thêm các trường và logic xử lý cho form đăng nhập bằng thiết bị di động */}
          {/* Ví dụ: */}

          <div className="flex items-center mb-6 mt-12">
            <label htmlFor="phone" className="mr-2">
              <MobileIcon className="w-[18px] h-[18px]" />
            </label>
            <PhoneInput
              id="phone"
              country="vn"
              value={formData.phone}
              onChange={handleChangePhone}
              inputProps={{ required: true }}
              name="phone"
            />
          </div>
          {errors && <div className="text-red-500 text-ss mt-1 mb-4">{errors.phone}</div>}

          <div className='text-center text-ss ml-6 mr-6 mb-4'>
            <p>Chúng tôi sẽ gửi một yêu cầu đăng nhập đến ứng dụng Zalo trên thiết bị của bạn.</p>

          </div>
          <button className='flex items-center mb-4 h-[46px] w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Đồng ý
          </button>

          <button onClick={handleBackToLoginPasswordForm}>&#171; Quay lại</button>
        </form>
      )}

      {/* Form quên mật khẩu */}
      {showForgotPasswordForm && (
        <form>
          <div className='flex items-center justify-center mt-10'>
            <p>Nhập số điện thoại của bạn</p>
          </div>
          {/* Thêm các trường và logic xử lý cho form quên mật khẩu */}
          {/* Ví dụ: */}
          <div className="flex items-center mb-6 mt-6">

            <label htmlFor="phone" className="mr-2">
              <MobileIcon className="w-[18px] h-[18px]" />
            </label>
            <PhoneInput
              id="phone"
              country="vn"
              value={formData.phone}
              onChange={handleChangePhone}
              inputProps={{ required: true }}
              name="phone"
            />
          </div>
          {errors && <div className="text-red-500 text-ss mt-1 mb-4">{errors.phone}</div>}

          <button className='flex items-center mb-4 h-[46px] w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Gửi yêu cầu</button>
          <button onClick={handleBackToLoginPasswordForm}>&#171; Quay lại</button>

        </form>

      )}



    </div>
  );
};

export default SdtTab;

