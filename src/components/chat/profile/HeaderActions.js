import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BellIcon, PinAngleOutlineIcon, SettingIcon, UserMultipleAddIcon } from '~/assets';
import { classNames } from '~/utils';
import ManageGroup from '../manageGroup';
import HeaderAction from './HeaderAction';

const HeaderActions = ({ className }) => {
    const { t } = useTranslation();
    const [showSetting, setShowSetting] = useState(false);

    const handleShowSetting = () => setShowSetting(true);
    const handleBack = () => setShowSetting(false);

    const actions = [
        {
            icon: BellIcon,
            title: t('chat.mute'),
            onClick: () => {},
        },
        {
            icon: PinAngleOutlineIcon,
            title: t('chat.pin-conversation'),
            onClick: () => {},
        },
        {
            icon: UserMultipleAddIcon,
            title: t('chat.add-members'),
            onClick: () => {},
        },
        {
            icon: SettingIcon,
            title: t('chat.manage-group'),
            onClick: handleShowSetting,
        },
    ];

    return (
        <div className={classNames('flex', className)}>
            {actions.map((action, index) => (
                <HeaderAction action={action} key={index} />
            ))}

            {showSetting ? <ManageGroup onBack={handleBack} /> : null}
        </div>
    );
};

HeaderActions.propTypes = {
    className: PropTypes.string,
};

export default HeaderActions;
