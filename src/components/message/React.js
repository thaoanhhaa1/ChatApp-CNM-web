import Tippy from '@tippyjs/react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmotionHappyLineIcon } from '~/assets';
import Reaction from '~/components/reaction';
import { useMessage } from '~/context';
import { updateMessageReact } from '~/features/chats/chatsSlice';
import { updateReact } from '~/features/messages/messagesSlice';
import Button from './Button';

const React = () => {
    const [instance, setInstance] = useState();
    const { chatId, statuses } = useMessage();
    const { user } = useSelector((state) => state.user);
    const { active } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const { myReact, reacts } = useMemo(() => {
        const reacts = new Set();
        let myReact = '';

        statuses.forEach((item) => {
            if (!item) return;

            if (item.user === user._id) myReact = item.react;

            reacts.add(item.react);
        });

        return {
            myReact,
            reacts: [...reacts],
        };
    }, [statuses, user._id]);

    const handleClickReact = (item) => {
        let newReact = '';

        if (item !== myReact) newReact = item;

        dispatch(
            updateMessageReact({
                conversationId: active?._id,
                messageId: chatId,
                userId: user._id,
                react: newReact,
            }),
        );
        dispatch(updateReact({ _id: chatId, userId: user._id, react: newReact }));
        // TODO Socket

        instance && instance.hide();

        // TODO Update chat in DB
    };

    return (
        <div>
            <Tippy
                content={
                    <Reaction>
                        {reacts.map((item) => (
                            <Reaction.Button
                                key={item}
                                active={myReact === item}
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
                <Button>
                    <EmotionHappyLineIcon className="w-[15px] h-[15px]" />
                </Button>
            </Tippy>
        </div>
    );
};

React.propTypes = {};

export default React;
