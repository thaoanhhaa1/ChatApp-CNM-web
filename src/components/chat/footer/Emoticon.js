import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tippy from '@tippyjs/react';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { EmotionHappyLineIcon } from '~/assets';
import Sticker from '~/components/sticker';
import Button from './Button';
import PropTypes from 'prop-types';

const Emoticon = ({ handleEmojiClick }) => {
    const [value, setValue] = useState('2');

    const handleChange = (_, a) => setValue(a);

    return (
        <div className="relative">
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
                        <TabPanel value="1">
                            <Sticker />
                        </TabPanel>
                        <TabPanel value="2">
                            <EmojiPicker searchDisabled onEmojiClick={handleEmojiClick} />
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

Emoticon.propTypes = {
    handleEmojiClick: PropTypes.func.isRequired,
};

export default Emoticon;
