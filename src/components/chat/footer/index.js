import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, MentionsInput } from 'react-mentions';
import { AttachmentLineIcon, ImageFillIcon, SendPlaneFillIcon } from '~/assets';
import Button from './Button';
import Emoticon from './Emoticon';
import MentionItem from './Mention';

const Footer = () => {
    const { t } = useTranslation();
    const [chat, setChat] = useState('');
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

    const handleSend = () => {
        console.log(chat);

        const messages = chat.split(/@~~|~~@/).map((message) => {
            if (chat.includes(`@~~${message}~~@`))
                return {
                    content: message.split('~~')[1],
                    id: message.split('~~')[0],
                    type: 'tag',
                };

            return {
                content: message,
                type: 'text',
            };
        });

        console.log('🚀 ~ messages ~ messages:', messages);
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

    return (
        <div className="items-end border-t border-separate dark:border-dark-separate p-2 sm:p-3 md:p-4 dl:p-5 flex gap-2 w-full">
            <label className="flex-1">
                <MentionsInput
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
                <Emoticon />
                <Button icon={AttachmentLineIcon} />
                <Button icon={ImageFillIcon} />
                <Button onClick={handleSend} icon={SendPlaneFillIcon} type="primary" />
            </div>
        </div>
    );
};

Footer.propTypes = {};

export default Footer;
