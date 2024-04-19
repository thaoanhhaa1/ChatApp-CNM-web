import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LeftLineIcon, LockIcon } from '~/assets';
import Button from '~/components/button';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { groupRole } from '~/constants';
import { useChat } from '~/context';
import { useBoolean } from '~/hooks';
import { classNames } from '~/utils';
import DeleteGroup from './DeleteGroup';

const ManageGroup = ({ onBack }) => {
    const { t } = useTranslation();
    const { active } = useSelector((state) => state.chats);
    const { myRole } = useChat();
    const {
        value: showDeleteGroup,
        setTrue: handleShowDeleteGroup,
        setFalse: handleHideDeleteGroup,
    } = useBoolean(false);

    if (!active) return null;

    return (
        <div className="absolute inset-0 bg-white z-10 flex flex-col">
            <div className="relative h-[68px] flex justify-center items-center border-b border-separate dark:border-dark-separate">
                <h2 className="text-lg font-medium text-center">{t('group.manage.title')}</h2>
                {onBack ? (
                    <span
                        onClick={onBack}
                        className="cursor-pointer absolute left-2 w-8 h-8 flex justify-center items-center hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 rounded-lg transition-all"
                    >
                        <LeftLineIcon className="w-5 h-5" />
                    </span>
                ) : null}
            </div>
            <ScrollbarCustomize>
                {myRole === groupRole.MEMBER_ROLE ? (
                    <div className="h-10 bg-[#f9fafb] flex items-center gap-1.5 justify-center">
                        <LockIcon className="w-[14px] h-[14px]" />
                        <span className="text-ss">{t('group.manage.warning')}</span>
                    </div>
                ) : null}
                <div className="flex flex-col gap-2 bg-[#eef0f1]">
                    {/* TODO Settings */}
                    <div
                        className={classNames(
                            'flex flex-col gap-2',
                            myRole === groupRole.MEMBER_ROLE && 'cursor-not-allowed',
                        )}
                    ></div>

                    {myRole === groupRole.OWNER_ROLE ? (
                        <div className="p-4 bg-white">
                            <Button onClick={handleShowDeleteGroup} className="w-full h-8" danger>
                                {t('group.manage.delete')}
                            </Button>
                        </div>
                    ) : null}
                </div>
            </ScrollbarCustomize>

            {active?._id ? <DeleteGroup show={showDeleteGroup} onClickOutside={handleHideDeleteGroup} /> : null}
        </div>
    );
};

ManageGroup.propTypes = {
    onBack: PropTypes.func,
};

export default ManageGroup;
