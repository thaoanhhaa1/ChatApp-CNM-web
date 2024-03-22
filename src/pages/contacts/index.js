import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SearchIcon, UserAddLineIcon } from '~/assets';
import AddContact from '~/components/addContact';
import ContactTab from '~/components/contactTab';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { resetSubs } from '~/features/popupMultiLevel/popupMultiLevelSlice';
import { useBoolean } from '~/hooks';

const Contacts = () => {
    const { t } = useTranslation();
    const { value, setTrue, setFalse } = useBoolean(false);
    const dispatch = useDispatch();
    const [tab, setTab] = useState('1');

    const handleChange = (_, a) => setTab(a);

    useEffect(() => {
        dispatch(resetSubs());
    }, [dispatch, value]);

    return (
        <div className="contacts flex flex-col h-full pb-2 sm:pb-5">
            <HeaderPage
                tooltip={t('contacts.add-contact')}
                title={t('contacts.title')}
                rightIcon={UserAddLineIcon}
                rightClick={setTrue}
            >
                <Input placeholder={t('contacts.search')} Icon={SearchIcon} />
            </HeaderPage>

            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList className="-mt-2 ex:-mt-3 sm:-mt-4 md:-mt-5 dl:-mt-6" onChange={handleChange}>
                        <Tab label={t('contacts.friend')} value="1" />
                        <Tab label={t('contacts.group')} value="2" />
                    </TabList>
                </Box>
                <ScrollbarCustomize>
                    <TabPanel value="1">
                        <ContactTab.Friend />
                    </TabPanel>
                    <TabPanel value="2">
                        <ContactTab.Group />
                    </TabPanel>
                </ScrollbarCustomize>
            </TabContext>

            <AddContact show={value} onClickOutside={setFalse} />
        </div>
    );
};

Contacts.propTypes = {};

export default Contacts;
