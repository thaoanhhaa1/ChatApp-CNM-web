import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingIcon } from '~/assets';
import Modal from '~/components/modal';
import PopupMultiLevel from '~/components/popupMultiLevel';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import ReceivedTab from './ReceivedTab';
import SentTab from './SentTab';

const RECEIVED_TAB = '1';
const SENT_TAB = '2';

const FriendRequest = ({ show, onClickOutside }) => {
    const { t } = useTranslation();
    const [tab, setTab] = useState(RECEIVED_TAB);

    const handleChange = (_, a) => setTab(a);

    const handleClose = () => {
        onClickOutside();
    };

    return (
        <Modal show={show} onClickOutside={onClickOutside}>
            <PopupMultiLevel onClose={handleClose}>
                <Modal.Header onClose={onClickOutside}>{t('contacts.friend-request.title')}</Modal.Header>

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
                                <ReceivedTab className="-m-6" />
                            </TabPanel>
                            <TabPanel value={SENT_TAB}>
                                <SentTab className="-m-6" />
                            </TabPanel>
                        </ScrollbarCustomize>
                    </TabContext>

                    <span className="cursor-pointer absolute top-0 right-0 w-12 h-12 flex justify-center items-center">
                        <SettingIcon />
                    </span>
                </div>
            </PopupMultiLevel>
        </Modal>
    );
};

FriendRequest.propTypes = {};

export default FriendRequest;
