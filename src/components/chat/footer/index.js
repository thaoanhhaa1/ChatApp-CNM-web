import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, MentionsInput } from 'react-mentions';
import { useSelector } from 'react-redux';
import { checkText } from 'smile2emoji';
import { AttachmentLineIcon, ImageFillIcon, SendPlaneFillIcon } from '~/assets';
import AttachFiles from '~/components/attachFiles';
import { insertEmojiToChat, splitMessage } from '~/utils';
import Button from './Button';
import Emoticon from './Emoticon';
import MentionItem from './Mention';
import SendFiles from './SendFiles';

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
    const { files } = useSelector((state) => state.attachFiles);
    const ref = useRef();
    const { width } = useWindowSize();

    const handleChange = (e) => setChat(checkText(e.target.value));
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

    const handleSendFiles = (files) => console.log('Send files...', files);

    const handleSend = () => {
        if (!chat) return;

        const messages = splitMessage(chat);

        console.log('🚀 ~ messages ~ messages:', messages);
        setChat('');
    };

    const renderUserSuggestion = (mention) => <MentionItem mention={mention} />;

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

    useLayoutEffect(() => {
        const inputElement = ref.current.inputElement;
        const containerElement = ref.current.containerElement;

        const inputWidth = inputElement.clientWidth;

        if (inputWidth < 300) containerElement.classList.add('move');
        else containerElement.classList.remove('move');
    }, [width]);

    return (
        <div className="border-t border-separate dark:border-dark-separate p-2 sm:p-3 md:p-4 dl:p-5">
            <div className="items-end flex gap-2">
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
                    <SendFiles onSend={handleSendFiles} Icon={AttachmentLineIcon} tooltip={t('chat.attached-file')} />
                    <SendFiles
                        onSend={handleSendFiles}
                        Icon={ImageFillIcon}
                        tooltip={t('chat.images')}
                        accept="image/*"
                    />
                    <Button onClick={handleSend} icon={SendPlaneFillIcon} type="primary" />
                </div>
            </div>
            {files.length > 0 && <AttachFiles />}
        </div>
    );
};

Footer.propTypes = {};

export default Footer;
