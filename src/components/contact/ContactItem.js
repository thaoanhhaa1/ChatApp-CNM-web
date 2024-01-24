import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BlockLineIcon, DeleteBinLineIcon, MoreFillIcon, ShareLineIcon } from '~/assets';
import Popup from '../popup';

const ContactItem = ({ contact }) => {
    const { t } = useTranslation();
    const more = [
        {
            title: t('contacts.share'),
            icon: ShareLineIcon,
        },
        {
            title: t('contacts.block'),
            icon: BlockLineIcon,
        },
        {
            title: t('contacts.remove'),
            icon: DeleteBinLineIcon,
        },
    ];

    return (
        <div className="px-3 sm:px-5 py-1.5 sm:py-2.5 flex justify-between items-center gap-2 cursor-pointer">
            <div className="text-sm font-semibold">{contact.name}</div>
            <Popup data={more} placement="bottom-end" animation="shift-toward" offset={[0, 0]}>
                <div className="pl-4 pr-1 py-1 text-secondary dark:text-dark-secondary">
                    <MoreFillIcon className="w-4 h-4 rotate-90" />
                </div>
            </Popup>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem;
