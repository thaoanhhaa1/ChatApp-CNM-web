import PropTypes from 'prop-types';
import { useState } from 'react';
import validator from 'validator';
import { LockIcon } from '~/assets';
import FormLogin from '~/components/Sigin/formLogin';
import Button from '~/components/button';
import Input from '~/components/input';


const UpdatePasswordForm = ({ sdt }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleConfirm = () => {
        if (!validator.isLength(password, { min: 6, max: undefined }))
            setError('Mật khẩu có ít nhất 6 kí tự');
        if (password !== confirmPassword) {
            setError('Mật khẩu nhập lại không khớp');
        } else {
            console.log("updating password");
            setError('')
        }

    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-center p-4 rounded-lg bg-pink-Purple mb-3'>
                <p className='mb-1 text-sm'>Gửi tin nhắn để nhận mã xác thực:</p>
                <p className='mb-3 text-hoverPurple'>+{sdt}</p>
                <Input className='text-center' outline placeholder='Nhập mã kích hoạt' />
                <p className='text-xs mt-3'>Soạn tin nhắn với cú pháp "ZALOPC" gửi đến 6020 (1000đ/tin) để nhận mã xác thực (Chỉ áp dụng cho mạng Viettel, Mobifone, Vinaphone, Vietnamobile, Gmobile)</p>
            </div>

            <FormLogin
                id="password"
                input
                type='password'
                name="password"
                icon={LockIcon}
                placeholder="Vui lòng nhập mật khẩu"
                error={error}
                onChange={e => setPassword(e.target.value)}
                value={password}
            />

            <FormLogin
                input
                id="password"
                type='password'
                name="password"
                icon={LockIcon}
                placeholder="Nhập lại mật khẩu"
                error={error}
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />

            <Button className='w-[300px] hover:bg-hoverPurple mt-5' primary onClick={handleConfirm}>Xác nhận</Button>
        </div>
    );
}
UpdatePasswordForm.propTypes = {

};
export default UpdatePasswordForm;