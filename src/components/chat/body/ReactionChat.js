import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { EmotionHappyLineIcon } from '~/assets';
import Reaction from '~/components/reaction';
import { reaction } from '~/constants';
import ChatItemButton from './ChatItemButton';

const ReactionChat = ({ react, setReact }) => {
    const [instance, setInstance] = useState();

    const handleClickReact = (item) => {
        if (item.id === react) setReact('');
        else setReact(item.id);
        instance && instance.hide();

        // Update chat in DB
    };

    return (
        <div>
            <Tippy
                content={
                    <Reaction>
                        {reaction.map((item) => (
                            <Reaction.Button
                                key={item.id}
                                active={react === item.id}
                                onClick={handleClickReact}
                                item={item}
                            />
                        ))}
                    </Reaction>
                }
                role="reaction"
                interactive
                offset={[0, 0]}
                trigger="click"
                arrow={false}
                onShown={setInstance}
            >
                <ChatItemButton>
                    <EmotionHappyLineIcon className="w-[15px] h-[15px]" />
                </ChatItemButton>
            </Tippy>
        </div>
    );
};

ReactionChat.propTypes = {
    react: PropTypes.string.isRequired,
    setReact: PropTypes.func.isRequired,
};

export default ReactionChat;
