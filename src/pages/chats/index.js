import { useWindowSize } from '@uidotdev/usehooks';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SearchIcon } from '~/assets';
import ChatItem from '~/components/chatItem';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';
import OnlineUser from '~/components/onlineUser';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { screens } from '~/constants';

const Chats = () => {
    const { t } = useTranslation();
    const { width } = useWindowSize();

    const onlineUsers = [
        {
            id: '1',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '2',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '3',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '4',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '5',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
        {
            id: '6',
            avatar: 'https://images.unsplash.com/photo-1705009448405-8151a45339d4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Patrick',
        },
    ];

    return (
        <div className="h-full flex flex-col">
            <HeaderPage title={t('chats.title')}>
                <div>
                    <Input Icon={SearchIcon} placeholder={t('chats.searchPlaceholder')} />
                    <Swiper spaceBetween={width < screens.SM ? 8 : 16} slidesPerView="auto" className="mt-2 sm:mt-4">
                        {onlineUsers.map((item) => (
                            <SwiperSlide className="!w-fit" key={item.id}>
                                <OnlineUser data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </HeaderPage>
            <div className="flex-1 flex flex-col pb-1 ex:pb-2 sm:pb-3 md:pb-4 dl:pb-5">
                <h3 className="px-1 ex:px-2 dl:px-4 sm:-mt-2 pb-1 ex:pb-2 dl:pb-4 text-base font-semibold">
                    {t('chats.recent')}
                </h3>
                <ScrollbarCustomize>
                    <div className="flex flex-col gap-[1px] px-1 ex:px-2">
                        <ChatItem />
                        <ChatItem />
                        <ChatItem active />
                        <ChatItem typing />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                        <ChatItem />
                    </div>
                </ScrollbarCustomize>
            </div>
        </div>
    );
};

Chats.propTypes = {};

export default Chats;
