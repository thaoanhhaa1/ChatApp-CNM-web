import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BellIcon, PinAngleOutlineIcon, SettingIcon, UserMultipleAddIcon } from '~/assets';
import { useBoolean } from '~/hooks';
import { classNames } from '~/utils';
import AddMembers from '../addMembers';
import ManageGroup from '../manageGroup';
import HeaderAction from './HeaderAction';

const HeaderActions = ({ className }) => {
    const { t } = useTranslation();
    const { value: showSetting, setTrue: handleShowSetting, setFalse: handleBack } = useBoolean(false);
    const { value: showAddMembers, setTrue: handleShowAddMembers, setFalse: handleHideAddMembers } = useBoolean(false);

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
            onClick: handleShowAddMembers,
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
            <AddMembers show={showAddMembers} handleClickOutside={handleHideAddMembers} />
        </div>
    );
};

HeaderActions.propTypes = {
    className: PropTypes.string,
};

export default HeaderActions;
