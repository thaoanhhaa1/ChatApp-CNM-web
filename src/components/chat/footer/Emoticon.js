import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tippy from '@tippyjs/react';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmotionHappyLineIcon } from '~/assets';
import { emoji } from '~/constants';
import Button from './Button';

const Emoticon = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('2');

    const [categories, setCategories] = useState([]);

    const handleChange = (_, a) => setValue(a);

    const handleShow = () => {
        console.log('Show..........');

        setCategories(
            emoji.categories.map((category) => ({
                category,
                name: t(`emoji.${category}`),
            })),
        );
    };

    useEffect(() => {
        console.log('Render');
    }, []);

    return (
        <div>
            <Tippy
                offset={[0, 0]}
                arrow={false}
                interactive
                content={
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="STICKER" value="1" />
                                <Tab label="EMOJI" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">
                            <EmojiPicker categories={categories} />
                        </TabPanel>
                    </TabContext>
                }
                placement="top-start"
                role="emoji"
                className="p-0"
                trigger="click"
            >
                <Button icon={EmotionHappyLineIcon} />
            </Tippy>
        </div>
    );
};

Emoticon.propTypes = {};

export default Emoticon;
