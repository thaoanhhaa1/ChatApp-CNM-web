import { useTranslation } from "react-i18next";
import Modal from "~/components/modal";
import PropTypes from 'prop-types';
import { useState } from "react";
import UnderlineInput from "~/components/underlineInput";
import FormControl from "~/components/formControl";
import validator from "validator";
import { changePassword } from "~/services";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UpdatePassword = ({ onClose }) => {
    const { t } = useTranslation();
    const [oldPassword, setOldPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
            if (!validator.matches(oldPassword, /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/))
             setErrors({...errors, oldPassword: t('register.error-password') });
            else {
                setErrors({ ...errors, oldPassword: '' });
            }
        } else if (name === 'newPassword') {
            setNewPassword(value);
            if (!validator.matches(newPassword, /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/)) {
                setErrors({...errors, newPassword: t('register.error-password') });
            }
            else {
                setErrors({ ...errors, newPassword: '' });
            }
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
            if(value !== newPassword) {
                setErrors({ ...errors, confirmPassword: t("register.error-password-01")})
            }else {
                setErrors({ ...errors, confirmPassword: '' });
            }
        }
    }

    const handleConfirm = async () => {
        if (!errors.newPassword && !errors.password && !errors.oldPassword) {
            try {
                setErrors("");
                console.log(confirmPassword, newPassword, oldPassword);
                const res = await changePassword({ oldPassword: oldPassword, newPassword:newPassword });
                console.log(res.data);
                toast.success(t('profile.updateSuccess'));
                setTimeout(() => {
                    onClose();
                }, 2000); 
            } catch (error) {
                setErrors({ ...errors, oldPassword: t('register.error-password') });
            }
    }
    };

    return (
        <>
            <ToastContainer />

            <Modal.Header onClose={onClose} className="text-sm">
                {t('settings.change_password')}
            </Modal.Header>
            <div className="h-[calc(min(400px,80vh)-45px)] w-[350px]">
                <div className="p-2 ex:p-3 sm:p-2">
                    <p className="text-sm mb-4">{t('settings.note')}</p>
                    <FormControl
                            label={t('settings.current_password')}
                            control={
                                <UnderlineInput
                containerClassName="w-full mb-3"
                                    type="password"
                                    placeholder={t('settings.current_password1')}
                                    onChange={handleChange}
                                    value={oldPassword}
                                    name="oldPassword"
                                />
                            }
                            error={errors.oldPassword}
                        />

                    <FormControl
                            label={t('settings.new_password')}
                            control={
                                <UnderlineInput
                containerClassName="w-full mb-3"
                type="password"

                                    placeholder={t('settings.new_password1')}
                                    onChange={handleChange}
                                    value={newPassword}
                                    name="newPassword"
                                />
                            }
                            error={errors.newPassword}
                        />

                    <FormControl
                            label={t('settings.confirm_password')}
                            control={
                                <UnderlineInput
                                    containerClassName="w-full mb-3"
                                    type="password"

                                    placeholder={t('settings.confirm_password')}
                                    onChange={handleChange}
                                    value={confirmPassword}
                                    name="confirmPassword"
                                />
                            }
                            error={errors.confirmPassword}
                        />
                </div>
            </div>
            <div className="flex justify-end items-center gap-2">
                <Modal.Button type="text-secondary" onClick={onClose}>
                    {t('profile.cancel')}
                </Modal.Button>
                <Modal.Button disabled={oldPassword.length < 6||newPassword.length < 6 || confirmPassword.length < 6} onClick={handleConfirm}>{t('profile.update')}</Modal.Button>
            </div>
            </>
    );
};
UpdatePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default UpdatePassword;