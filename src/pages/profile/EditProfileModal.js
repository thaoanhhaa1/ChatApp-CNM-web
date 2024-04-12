import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import FormControl from '~/components/formControl';
import Modal from '~/components/modal';
import RadioGroup from '~/components/radioGroup';
import UnderlineInput from '~/components/underlineInput';
import { genders } from '~/constants';
import { updateUser } from '~/services';

const EditProfileModal = ({ onClose = () => {} }) => {
    const { user } = useSelector((state) => state.user);
    const { t } = useTranslation();
    const [errors, setErrors] = useState({});
    const [name, setName] = useState(user.name);
    const [gender, setGender] = useState(user.gender);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
    const gendersTranslation = useMemo(() => genders.map((gender) => ({ ...gender, label: t(gender.label) })), [t]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
            if (value.length < 2) setErrors({ ...errors, name: t('register.zalo-name-validate-min-length') });
            else if (value.length > 40) setErrors({ ...errors, name: t('register.zalo-name-validate-max-length') });
            else if (!validator.matches(value, /^[^!@#$%^&*(),.?":{}|<>]*$/))
                setErrors({ ...errors, name: t('register.zalo-name-validate-special-character') });
            else if (!validator.matches(value, /^[^0-9]*$/))
                setErrors({ ...errors, name: t('register.zalo-name-validate-number-character') });
            else {
                setErrors({ ...errors, name: '' });
            }
        } else if (name === 'gender') {
            setGender(value);
        } else if (name === 'dateOfBirth') {
            setDateOfBirth(value);
            const currentDate = new Date();
            const dob = new Date(value);
            const age = currentDate.getFullYear() - dob.getFullYear();
            if (age < 14) {
                setErrors({ ...errors, dateOfBirth: t('register.dob-validate') });
            } else if (!value) {
                setErrors({ ...errors, dateOfBirth: t('register.dob-validate1') });
            } else {
                setErrors({ ...errors, dateOfBirth: '' });
            }
        }
    };

    const handleUpdateProfile = async () => {
        if (!errors.name && !errors.dateOfBirth) {
            try {
                const updatedInfo = { name, gender, dateOfBirth };
                const response = await updateUser(updatedInfo);
                console.log('Thông tin người dùng đã được cập nhật:', response.data);
                toast.success(t('profile.updateSuccess'));

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.error('Đã xảy ra lỗi khi cập nhật thông tin người dùng:', error);
                toast.error(t('profile.updateError'));
            }
        }
    };

    return (
        <>
            <Modal.Header showBack onClose={onClose}>
                {t('profile.updateProfile')}
            </Modal.Header>

            <div className="h-[calc(min(300px,80vh)-45px)]">
                <div className="p-2 ex:p-3 sm:p-4">
                    <FormControl
                        label={t('profile.name')}
                        control={
                            <UnderlineInput
                                containerClassName="w-full mb-3"
                                placeholder={t('profile.placeholder')}
                                onChange={handleChange}
                                value={name}
                                name="name"
                            />
                        }
                        error={errors.name}
                    />

                    <RadioGroup
                        name="gender"
                        data={gendersTranslation}
                        label={t('register.gender')}
                        onChange={handleChange}
                        value={gender}
                    />

                    <FormControl
                        label={t('register.birthday')}
                        control={
                            <UnderlineInput
                                name={'dateOfBirth'}
                                value={dateOfBirth}
                                onChange={handleChange}
                                type="date"
                            />
                        }
                        error={errors.dateOfBirth}
                    />
                </div>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button type="text-secondary" onClick={onClose}>
                    {t('profile.cancel')}
                </Modal.Button>
                <Modal.Button onClick={handleUpdateProfile}>{t('profile.update')}</Modal.Button>
            </Modal.Footer>
            <ToastContainer />
        </>
    );
};

EditProfileModal.propTypes = {
    onClose: PropTypes.func,
};

export default EditProfileModal;
