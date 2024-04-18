import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Modal from '~/components/modal';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import UserItem from './UserItem';

const ChangeOwnerRole = ({ checked, show, onClickOutside, onContinue, setChecked }) => {
    const { t } = useTranslation();
    const { active } = useSelector((state) => state.chats);
    const { user: me } = useSelector((state) => state.user);

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <Modal.Header onClose={onClickOutside}>{t('group.owner-leave.title')}</Modal.Header>

            <div>
                <div className="flex flex-col h-[360px]">
                    <ScrollbarCustomize>
                        {active.users.map((user) =>
                            user._id !== me._id ? (
                                <UserItem
                                    key={user._id}
                                    user={user}
                                    checked={checked === user._id}
                                    onChange={() => setChecked(user._id)}
                                />
                            ) : null,
                        )}
                    </ScrollbarCustomize>
                </div>
            </div>

            <Modal.Footer className="flex justify-end items-center gap-2">
                <Modal.Button onClick={onClickOutside} type="text-primary">
                    {t('group.owner-leave.cancel')}
                </Modal.Button>
                <Modal.Button onClick={onContinue}>{t('group.owner-leave.select-and-continue')}</Modal.Button>
            </Modal.Footer>
        </Modal>
    );
};

ChangeOwnerRole.propTypes = {
    show: PropTypes.bool,
    onClickOutside: PropTypes.func,
    onContinue: PropTypes.func,
    checked: PropTypes.string,
    setChecked: PropTypes.func,
};

export default ChangeOwnerRole;
