import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AttachmentLineIcon, CloseLineIcon, GroupIcon, RecordCircleFillIcon, UserIcon } from '~/assets';
import Accordion from '~/components/accordion';
import AttachedFile from '~/components/attachedFile';
import Avatar from '~/components/avatar';
import Member from '~/components/member';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { useChat } from '~/context';
import { getNameConversation } from '~/utils';
import About from './About';

const Profile = () => {
    const [active, setActive] = useState(-1);
    const { t } = useTranslation();
    const { handleHideProfile } = useChat();
    const { user } = useSelector((state) => state.user);
    const { active: activeChat } = useSelector((state) => state.chats);
    const conversationName = getNameConversation(activeChat, user);

    const accordions = useMemo(() => {
        const data = [
            {
                icon: UserIcon,
                title: 'chat.about',
                children: <About />,
            },
            {
                icon: AttachmentLineIcon,
                title: 'chat.attached-files',
                children: (
                    <div className="flex flex-col gap-2">
                        <AttachedFile
                            file={{
                                name: 'Admin-A.zip',
                                size: 2777,
                            }}
                        />
                        <AttachedFile
                            file={{
                                name: 'Admin-A.png',
                                size: 95,
                            }}
                        />
                    </div>
                ),
            },
        ];

        if (activeChat.isGroup) {
            data.push({
                icon: GroupIcon,
                title: 'chat.members',
                children: (
                    <div className="flex flex-col gap-2">
                        <Member
                            user={{
                                avatar: 'https://plus.unsplash.com/premium_photo-1703689541382-8945aee7fcf8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                name: 'Sera Mullar',
                                role: 'Admin',
                            }}
                        />
                        <Member
                            user={{
                                avatar: 'https://plus.unsplash.com/premium_photo-1703689541382-8945aee7fcf8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                name: 'Sera Mullar',
                            }}
                        />
                    </div>
                ),
            });
        }

        return data;
    }, [activeChat.isGroup]);

    if (!activeChat?._id) return null;

    return (
        <div className="z-1 fixed top-0 bottom-0 right-0 gx:relative flex flex-col w-full max-w-[380px] border-l-4 border-separate dark:border-dark-separate h-screen pb-2 ex:pb-3 sm:pb-4 md:pb-5 dl:pb-6 bg-white dark:bg-dark">
            <div className="p-2 ex:p-3 sm:p-4 md:p-5 dl:p-6 border-b border-separate dark:border-dark-separate">
                <button
                    onClick={handleHideProfile}
                    className="ml-auto w-10 h-10 flex justify-center items-center text-secondary dark:text-dark-secondary"
                >
                    <CloseLineIcon />
                </button>

                <div className="flex flex-col items-center mt-2 ex:mt-3 sm:mt-4 md:mt-5 dl:mt-6">
                    <Avatar size="96px" src={activeChat.picture} />
                    <h5 className="mt-2 ex:mt-3 sm:mt-4 md:mt-5 dl:mt-6 mb-1 font-semibold">{conversationName}</h5>
                    <div className="flex items-center gap-1">
                        <RecordCircleFillIcon className="flex-shrink-0 w-2.5 h-2.5 text-success" />
                        <p className="text-mm text-secondary dark:text-dark-secondary">{t('chat.active')}</p>
                    </div>
                </div>
            </div>
            <ScrollbarCustomize>
                <div className="p-2 ex:p-3 sm:p-4 md:p-5 dl:p-6 pb-0">
                    <p className="text-mm text-secondary dark:text-dark-secondary mb-2 ex:mb-3 sm:mb-4 md:mb-5 dl:mb-6 leading-normal">
                        "If several languages coalesce, the grammar of the resulting language is more simple and regular
                        than that of the individual."
                    </p>
                    <div className="flex flex-col gap-2">
                        {accordions.map((accordion, index) => (
                            <Accordion
                                toggleActive={() => {
                                    if (index === active) setActive(-1);
                                    else setActive(index);
                                }}
                                active={index === active}
                                key={index}
                                {...accordion}
                                title={t(accordion.title)}
                            />
                        ))}
                    </div>
                </div>
            </ScrollbarCustomize>
        </div>
        
    );
};

export default Profile;
