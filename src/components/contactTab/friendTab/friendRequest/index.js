import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SettingIcon } from '~/assets';
import Modal from '~/components/modal';
import PopupMultiLevel from '~/components/popupMultiLevel';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { setFriendRequest, setFriendRequestFirstFetch, setNewReceived } from '~/features/friend/friendSlice';
import { addSub, resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import friendServices from '~/services/friend.service';
import Manage from './Manage';
import ReceivedTab from './ReceivedTab';
import SentTab from './SentTab';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const RECEIVED_TAB = '1';
const SENT_TAB = '2';

const FriendRequest = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const [tab, setTab] = useState(RECEIVED_TAB);
    const { hasNewReceived, friendRequestFirstFetch } = useSelector((state) => state.friend);
    const dispatch = useDispatch();

    const handleChange = (_, a) => setTab(a);

    const handleClose = () => {
        onClickOutside();
        dispatch(resetSubs());
    };

    const handleClickSetting = () => dispatch(addSub(Manage));

    useEffect(() => {
        const fetchFriendRequest = async () => {
            const request = [];

            request.push(friendServices.requestFriends());
            request.push(friendServices.responseFriends());

            try {
                const res = await Promise.all(request);

                const [requestFriends, responseFriends] = res.map((item) => item.data);

                dispatch(setFriendRequest({ requestFriends, responseFriends }));
                dispatch(setFriendRequestFirstFetch());
            } catch (error) {
                console.error(error);
            }
        };

        friendRequestFirstFetch || fetchFriendRequest();
    }, [dispatch, friendRequestFirstFetch]);

    useEffect(() => {
        show && tab === RECEIVED_TAB && dispatch(setNewReceived(false));
    }, [dispatch, show, hasNewReceived, tab]);

    return (
        <Modal show={show} onClickOutside={handleClose}>
            <PopupMultiLevel onClose={handleClose}>
                <Modal.Header onClose={handleClose}>{t('contacts.friend-request.title')}</Modal.Header>

                <div className="relative flex flex-col h-[min(350px,60vh)]">
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label={t('contacts.friend-request.received')} value={RECEIVED_TAB} />
                                <Tab label={t('contacts.friend-request.sent')} value={SENT_TAB} />
                            </TabList>
                        </Box>
                        <ScrollbarCustomize>
                            <TabPanel value={RECEIVED_TAB}>
                                <ReceivedTab />
                            </TabPanel>
                            <TabPanel value={SENT_TAB}>
                                <SentTab />
                            </TabPanel>
                        </ScrollbarCustomize>
                    </TabContext>

                    <span
                        onClick={handleClickSetting}
                        className="text-secondary dark:text-dark-secondary cursor-pointer absolute top-0 right-0 w-12 h-12 flex justify-center items-center"
                    >
                        <SettingIcon />
                    </span>
                </div>
            </PopupMultiLevel>
        </Modal>
    );
};

FriendRequest.propTypes = {
    show: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired,
};

export default withErrorBoundary(FriendRequest, {
    fallback: null,
    onError: (error, info) => {
        toast.error('FriendRequest::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
