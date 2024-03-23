import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { classNames } from '~/utils';

const Item = ({ language, children }) => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = () => i18n.changeLanguage(language);

    return (
        <span
            onClick={handleChangeLanguage}
            className={classNames('cursor-pointer', i18n.language === language && 'font-bold')}
        >
            {children}
        </span>
    );
};

Item.propTypes = {
    language: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Item;
