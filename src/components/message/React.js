import Tippy from '@tippyjs/react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmotionHappyLineIcon } from '~/assets';
import Reaction from '~/components/reaction';
import { reaction } from '~/constants';
import { useMessage } from '~/context';
import { updateMessageReact } from '~/features/chats/chatsSlice';
import { updateReact } from '~/features/messages/messagesSlice';
import messageServices from '~/services/message.service';
import { retryPromise } from '~/utils';
import Button from './Button';

const React = () => {
    const [instance, setInstance] = useState();
    const { chatId, statuses } = useMessage();
    const { user } = useSelector((state) => state.user);
    const { active } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const myReact = useMemo(() => statuses.find((item) => item.user === user._id)?.react, [statuses, user._id]);

    const handleClickReact = (item) => {
        let newReact = '';

        if (item.id !== myReact) newReact = item.id;

        dispatch(
            updateMessageReact({
                conversationId: active?._id,
                messageId: chatId,
                userId: user._id,
                react: newReact,
            }),
        );
        dispatch(updateReact({ _id: chatId, userId: user._id, react: newReact }));
        retryPromise(() => messageServices.react({ react: newReact, messageId: chatId }), 5, 200).then();
        socket.emit('reactForMessage', {
            users: active.users,
            conversationId: active._id,
            messageId: chatId,
            react: newReact,
            userId: user._id,
        });

        instance && instance.hide();
    };

    return (
        <div>
            <Tippy
                content={
                    <Reaction>
                        {reaction.map((item) => (
                            <Reaction.Button
                                key={item.id}
                                active={myReact === item.id}
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
