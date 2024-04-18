import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Button from '~/components/button';
import { addSub } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import UpdatePassword from './updatePassword';

// TODO Update UI
const Privacy = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleShowUpdatePassword = () => {
        dispatch(addSub(UpdatePassword));
    };

    return (
        <div>
            <h2 className="text-black font-semibold">{t('settings.login_password')}</h2>
            <Button onClick={handleShowUpdatePassword} className="text-sm bg-gray-50">
                {t('settings.change_password')}
            </Button>
        </div>
    );
};

export default Privacy;
