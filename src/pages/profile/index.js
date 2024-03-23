import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AttachmentLineIcon, More2FillIcon, RecordCircleFillIcon, UserIcon } from '~/assets';
import Accordion from '~/components/accordion';
import AttachedFile from '~/components/attachedFile';
import Avatar from '~/components/avatar';
import About from '~/components/chat/profile/About';
import HeaderPage from '~/components/headerPage';
import ScrollbarCustomize from '~/components/scrollbarCustomize';

const Profile = () => {
    const [active, setActive] = useState(-1);
    const { t } = useTranslation();

    const more = [
        {
            title: 'Edit',
        },
        {
            title: 'Action',
            separate: true,
        },
        {
            title: 'Another action',
        },
    ];

    const accordions = [
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

    return (
        <div className="h-full flex flex-col">
            <HeaderPage title={t('profile.title')} rightIcon={More2FillIcon} data={more} />
            <div className="p-2 ex:p-3 sm:p-4 md:p-5 dl:p-6 border-b border-separate dark:border-dark-separate">
                <div className="flex flex-col items-center mt-2 ex:mt-3 sm:mt-4 md:mt-5 dl:mt-6">
                    <Avatar
                        size="96px"
                        src="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                    <h5 className="mt-2 ex:mt-3 sm:mt-4 md:mt-5 dl:mt-6 mb-1 font-semibold">General</h5>
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

Profile.propTypes = {};

export default Profile;
