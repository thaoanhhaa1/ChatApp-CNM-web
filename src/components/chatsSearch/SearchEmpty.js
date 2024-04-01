import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import images from '~/assets/images';
import { getDate } from '~/utils';

const SearchEmpty = () => {
    const { t } = useTranslation();
    const { settings } = useSelector((state) => state.localSetting);

    return (
        <div className="mt-16 flex flex-col items-center px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6">
            <img className="w-[160px]" src={images.searchEmpty} alt="" />
            <div className="mt-8 text-sm text-center">
                <h5 className="font-medium">{t('chats-search.search-empty-title')}</h5>
                <p className="mt-1 text-secondary dark:text-dark-secondary">
                    {t('chats-search.search-empty-description')}
                    {getDate(settings.loginAt)}.
                </p>
            </div>
        </div>
    );
};

SearchEmpty.propTypes = {};

export default SearchEmpty;
