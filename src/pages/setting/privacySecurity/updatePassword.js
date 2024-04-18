import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import validator from 'validator';
import FormControl from '~/components/formControl';
import Modal from '~/components/modal';
import UnderlineInput from '~/components/underlineInput';
import { resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import authServices from '~/services/auth.service';

const UpdatePassword = ({ onClose }) => {
    const { t } = useTranslation();
    const [oldPassword, setOldPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { updateHeightPopup } = useSelector((state) => state.popupMultiLevel);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setErrors({});
        const { name, value } = event.target;
        if (name === 'oldPassword') setOldPassword(value);
        else if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const validate = () => {
        const newErrors = { ...errors };

        if (!validator.matches(oldPassword, /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/))
            newErrors.oldPassword = t('register.error-password');

        if (!validator.matches(newPassword, /^(?=.*\d)(?=.*[a-zA-Z]).{6,32}$/))
            newErrors.newPassword = t('register.error-password');
        else if (newPassword !== confirmPassword) newErrors.confirmPassword = t('register.error-password-01');

        setErrors(newErrors);
        return newErrors;
    };

    const handleConfirm = async () => {
        const errors = validate();

        if (!Object.keys(errors).length) {
            try {
                console.log(confirmPassword, newPassword, oldPassword);
                const res = await authServices.changePassword({ oldPassword: oldPassword, newPassword: newPassword });
                console.log(res.data);
                toast.success(t('profile.updateSuccess'));
                dispatch(resetSubs());
            } catch (error) {
                console.error(error);
                if (error.response.status === 400) {
                    setErrors({ ...errors, oldPassword: t('profile.error-incorrect-old-password') });
                } else setErrors({ ...errors, oldPassword: t('request-error') });
            }
        }
    };

    useLayoutEffect(() => {
        updateHeightPopup();
    }, [errors, updateHeightPopup]);

    return (
        <>
            <Modal.Header onClose={onClose} className="text-sm" showBack>
                {t('settings.change_password')}
            </Modal.Header>
            <div className="flex flex-col">
                <div className="p-2 ex:p-3 sm:p-4 flex flex-col gap-3">
                    <p className="text-sm">{t('settings.note')}</p>
                    <FormControl
                        label={t('settings.current_password')}
                        control={
                            <UnderlineInput
                                containerClassName="w-full"
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
                                containerClassName="w-full"
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
                                containerClassName="w-full"
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
            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button type="text-secondary" onClick={onClose}>
                    {t('profile.cancel')}
                </Modal.Button>
                <Modal.Button
                    disabled={oldPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6}
                    onClick={handleConfirm}
                >
                    {t('profile.update')}
                </Modal.Button>
            </Modal.Footer>
        </>
    );
};
UpdatePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default UpdatePassword;
