import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/button';
import { MobileIcon } from '~/assets';
import FormLogin from '~/components/Sigin/formLogin';
import UpdatePasswordForm from './UpdatePasswordForm';
import validator from 'validator';

const ForgotPasswordForm = ({ value, onChange, onClick }) => {
    const [showUpdatePass, setshowUpdatePass] = useState(false);
    // const [phone, setPhone] = useState({ value });
    const [error, setError] = useState('');

    const handleContinue = () => {
        if (!validator.isMobilePhone(value, 'vi-VN')) {
            setError('Số điện thoại không hợp lệ');
        } else {
            setshowUpdatePass(true);
        }
    };

    return (
        <div>
            {!showUpdatePass ? (
                <>
                    <div className='flex items-center justify-center mb-5'>
                        <p>Nhập số điện thoại của bạn</p>
                    </div>
                    <FormLogin
                        name="phone"
                        icon={MobileIcon}
                        value={value}
                        onChange={onChange}
                        error={error}
                    />

                    <Button className='w-full hover:bg-hoverPurple mt-5' primary onClick={handleContinue}>Tiếp tục</Button>
                    <Button onClick={onClick}>&#171; Quay lại</Button>
                </>
            ) : (
                <div>
                    <UpdatePasswordForm sdt={value} />
                </div>
            )

            }
        </div>

    );
};

ForgotPasswordForm.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
