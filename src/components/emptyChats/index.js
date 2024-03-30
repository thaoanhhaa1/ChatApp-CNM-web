import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ListIcon } from '~/assets';
import { getDate } from '~/utils';

const EmptyChats = () => {
    const { t } = useTranslation();
    const { settings } = useSelector((state) => state.localSetting);

    return (
        <div className="mt-20 flex flex-col items-center px-1 ex:px-2 dl:px-4">
            <span className="text-secondary">
                <ListIcon className="w-[107px] aspect-[16/11]" />
            </span>
            <h4 className="text-sm font-medium mt-10">{t('chats.no-conversations')}</h4>
            <p className="text-sm text-secondary dark:text-dark-secondary mt-1 text-center">
                {t('chats.no-conversations-description')}
                &nbsp; ({settings.loginAt.substring(11, 16)}
                &nbsp;
                {t('chats.no-conversations-description-1')}
                &nbsp;
                {getDate(settings.loginAt)})
            </p>
        </div>
    );
};

EmptyChats.propTypes = {};

export default EmptyChats;
