import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, MentionsInput } from 'react-mentions';
import { AttachmentLineIcon, ImageFillIcon, SendPlaneFillIcon } from '~/assets';
import { insertEmojiToChat, splitMessage } from '~/utils';
import Button from './Button';
import Emoticon from './Emoticon';
import MentionItem from './Mention';

const Footer = () => {
    const { t } = useTranslation();
    const [chat, setChat] = useState('');
    const [selectionStart, setSelectionStart] = useState(-1);
    const [mentions] = useState([
        {
            id: 'walter',
            display: 'Walter White',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'pipilu',
            display: '皮皮鲁',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'luxixi',
            display: '鲁西西',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'satoshi1',
            display: '中本聪',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'satoshi2',
            display: 'サトシ・ナカモト',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'nobi',
            display: '野比のび太',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'sung',
            display: '성덕선',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'jesse',
            display: 'Jesse Pinkman',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'gus',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            display: 'Gustavo "Gus" Fring',
        },
        {
            id: 'saul',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            display: 'Saul Goodman',
        },
        {
            id: 'hank',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            display: 'Hank Schrader',
        },
        {
            id: 'skyler',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            display: 'Skyler White',
        },
        {
            id: 'mike',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            display: 'Mike Ehrmantraut',
        },
        {
            id: 'lydia',
            avatar: 'https://images.unsplash.com/photo-1706562017807-1ace3fbcb8df?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            display: 'Lydìã Rôdarté-Qüayle',
        },
    ]);
    const ref = useRef();

    const handleChange = (e) => setChat(e.target.value);
    const handleEmojiClick = (e) => {
        const inputElement = ref.current.inputElement;
        const selectionStart = inputElement.selectionStart;

        setChat((chat) => insertEmojiToChat(e.emoji, chat, ref.current.inputElement));
        setSelectionStart(selectionStart + 2);
    };

    const handleKeyDown = (e) => {
        if (e.code === 'Enter' && !e.shiftKey) {
            handleSend();
            e.preventDefault();
        }
    };

    const handleSend = () => {
        const messages = splitMessage(chat);

        console.log('🚀 ~ messages ~ messages:', messages);
        setChat('');
    };

    const renderUserSuggestion = (e) => <MentionItem mention={e} />;

    const displayTransform = (_, display) => `@${display}`;

    useEffect(() => {
        if (!ref.current) return () => {};

        const highlighterElement = ref.current.highlighterElement;
        const inputElement = ref.current.inputElement;

        const handleScroll = () => (highlighterElement.scrollTop = inputElement.scrollTop);

        inputElement.addEventListener('scroll', handleScroll);

        return () => inputElement.removeEventListener('scroll', handleScroll);
    }, []);

    useLayoutEffect(() => {
        const inputElement = ref.current.inputElement;

        if (selectionStart === -1) return;

        inputElement.focus();
        inputElement.setSelectionRange(selectionStart, selectionStart);
    }, [selectionStart]);

    return (
        <div className="items-end border-t border-separate dark:border-dark-separate p-2 sm:p-3 md:p-4 dl:p-5 flex gap-2 w-full">
            <label className="flex-1">
                <MentionsInput
                    onKeyDown={handleKeyDown}
                    allowSpaceInQuery
                    forceSuggestionsAboveCursor
                    spellCheck={false}
                    maxLength={135813}
                    autoComplete="off"
                    autoCorrect="off"
                    ref={ref}
                    rows={1}
                    value={chat}
                    onChange={handleChange}
                    placeholder={t('chat.chat')}
                    className="mentions-input rounded text-sm leading-normal placeholder:text-secondary dark:placeholder:text-dark-secondary text-input dark:text-dark-primary bg-input-bg dark:bg-dark-input-bg flex-1 my-0.5"
                >
                    <Mention
                        displayTransform={displayTransform}
                        markup="@~~__id__~~__display__~~@"
                        appendSpaceOnAdd
                        className="text-[#0068ff]"
                        trigger="@"
                        data={mentions}
                        renderSuggestion={renderUserSuggestion}
                    />
                </MentionsInput>
            </label>
            <div className="flex">
                <Emoticon handleEmojiClick={handleEmojiClick} />
                <Button icon={AttachmentLineIcon} />
                <Button icon={ImageFillIcon} />
                <Button onClick={handleSend} icon={SendPlaneFillIcon} type="primary" />
            </div>
        </div>
    );
};

Footer.propTypes = {};

export default Footer;
