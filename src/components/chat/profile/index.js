import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AttachmentLineIcon, CloseLineIcon, GroupIcon, RecordCircleFillIcon, UserIcon } from '~/assets';
import Accordion from '~/components/accordion';
import ConversationAvatar from '~/components/conversationAvatar';
import Member from '~/components/member';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { useChat } from '~/context';
import { addRoleToUser, getNameConversation, sortMemberByRole } from '~/utils';
import About from './About';
import AttachedFiles from './AttachedFiles';
import HeaderActions from './HeaderActions';

const Profile = () => {
    const [active, setActive] = useState(-1);
    const { t } = useTranslation();
    const { handleHideProfile } = useChat();
    const { user } = useSelector((state) => state.user);
    const { active: activeChat } = useSelector((state) => state.chats);
    const conversationName = getNameConversation(activeChat, user._id);

    const sortedMember = useMemo(
        () =>
            activeChat?.users
                ? sortMemberByRole(activeChat.users, activeChat.admin, activeChat.deputy).map((user) =>
                      addRoleToUser(user, activeChat.admin, activeChat.deputy),
                  )
                : [],
        [activeChat?.users, activeChat?.admin, activeChat?.deputy],
    );

    const accordions = useMemo(() => {
        if (!activeChat) return [];

        const data = [
            {
                icon: AttachmentLineIcon,
                title: 'chat.attached-files',
                children: <AttachedFiles />,
            },
        ];

        if (activeChat.isGroup) {
            data.push({
                icon: GroupIcon,
                title: 'chat.members',
                children: (
                    <div className="flex flex-col gap-2">
                        {sortedMember.map((user) => (
                            <Member key={user._id} user={user} />
                        ))}
                    </div>
                ),
            });
        } else
            data.unshift({
                icon: UserIcon,
                title: 'chat.about',
                children: <About />,
            });

        return data;
    }, [activeChat, sortedMember]);

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
                    <ConversationAvatar conversation={activeChat} size="96px" />
                    <h5 className="mt-2 ex:mt-3 sm:mt-4 md:mt-5 dl:mt-6 mb-1 font-semibold">{conversationName}</h5>
                    <div className="flex items-center gap-1">
                        <RecordCircleFillIcon className="flex-shrink-0 w-2.5 h-2.5 text-success" />
                        <p className="text-mm text-secondary dark:text-dark-secondary">{t('chat.active')}</p>
                    </div>
                </div>

                {activeChat.isGroup ? <HeaderActions className="pt-3" /> : null}
            </div>
            <ScrollbarCustomize>
                <div className="p-2 ex:p-3 sm:p-4 md:p-5 dl:p-6 pb-0">
                    {/* <p className="text-mm text-secondary dark:text-dark-secondary mb-2 ex:mb-3 sm:mb-4 md:mb-5 dl:mb-6 leading-normal">
                        "If several languages coalesce, the grammar of the resulting language is more simple and regular
                        than that of the individual."
                    </p> */}
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
