import { useWindowSize } from '@uidotdev/usehooks';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SearchIcon } from '~/assets';
import ChatItem from '~/components/chatItem';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';
import OnlineUser from '~/components/onlineUser';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { screens } from '~/constants';

// TODO Search
// TODO Click online user
const Chats = () => {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const { users: onlineUsers } = useSelector((state) => state.onlineUsers);
    const { chats, active } = useSelector((state) => state.chats);

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
                        {chats.map((chat) => (
                            <ChatItem key={chat.id} chat={chat} active={chat.id === active?.id} />
                        ))}
                    </div>
                </ScrollbarCustomize>
            </div>
        </div>
    );
};

Chats.propTypes = {};

export default Chats;
