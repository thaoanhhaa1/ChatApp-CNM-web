import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isPhotoFile } from '~/utils';
import HeaderLabel from './HeaderLabel';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { files } = useSelector((state) => state.attachFiles);
    const [numberPhotos, numberFiles] = useMemo(
        () =>
            files.reduce(
                (prev, file) => {
                    const [numberPhotos, numberFiles] = prev;

                    if (isPhotoFile(file.name)) return [numberPhotos + 1, numberFiles];

                    return [numberPhotos, numberFiles + 1];
                },
                [0, 0],
            ),
        [files],
    );

    return (
        <div className="flex items-center pb-2 text-sm leading-normal gap-1">
            {numberPhotos > 0 && (
                <HeaderLabel number={numberPhotos}>
                    {t('attachFiles.photo')}
                    {numberPhotos > 1 && i18n.language === 'en' && 's'}
                </HeaderLabel>
            )}
            {numberPhotos > 0 && numberFiles > 0 && <span>{t('attachFiles.and')}</span>}
            {numberFiles > 0 && (
                <HeaderLabel number={numberFiles}>
                    {t('attachFiles.file')}
                    {numberFiles > 1 && i18n.language === 'en' && 's'}
                </HeaderLabel>
            )}
            <span>{t('attachFiles.selected')}</span>
        </div>
    );
};

Header.propTypes = {};

export default Header;
