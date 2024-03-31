import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tippy from '@tippyjs/react';
import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmotionHappyLineIcon } from '~/assets';
import Sticker from '~/components/sticker';
import Button from './Button';

const Emoticon = ({ handleEmojiClick }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState('2');
    const [emoji, setEmoji] = useState();

    const handleChange = (_, a) => setValue(a);
    const handleEmojiChange = (e) => setEmoji(e.emoji);

    useEffect(() => {
        if (emoji) {
            handleEmojiClick(emoji);
            setEmoji(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emoji]);

    return (
        <div className="relative emoticon">
            <Tippy
                offset={[0, 0]}
                arrow={false}
                interactive
                content={
                    <TabContext value={value} className="dark:bg-dark-sidebar-item-color">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="STICKER" value="1" />
                                <Tab label="EMOJI" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Sticker />
                        </TabPanel>
                        <TabPanel value="2">
                            <EmojiPicker searchDisabled onEmojiClick={handleEmojiChange} />
                        </TabPanel>
                    </TabContext>
                }
                placement="top-start"
                role="emoji"
                className="p-0"
                trigger="click"
            >
                <Tippy content={t('chat.emoji')}>
                    <Button icon={EmotionHappyLineIcon} />
                </Tippy>
            </Tippy>
        </div>
    );
};

Emoticon.propTypes = {
    handleEmojiClick: PropTypes.func.isRequired,
};

export default Emoticon;
