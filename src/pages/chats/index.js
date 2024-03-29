import { useDebounce, useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SearchIcon } from '~/assets';
import ChatItem from '~/components/chatItem';
import ChatsSearch from '~/components/chatsSearch';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';
import OnlineUser from '~/components/onlineUser';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { screens } from '~/constants';

// TODO Search
// TODO Click online user
const Chats = () => {
    const { t } = useTranslation();
    const { width, height } = useWindowSize();
    const { users: onlineUsers } = useSelector((state) => state.onlineUsers);
    const { chats, active } = useSelector((state) => state.chats);
    const [searchValue, setSearchValue] = useState('');
    const inputWrapRef = useRef();
    const [boundClientRect, setBoundingClientRect] = useState({ top: 0 });
    const searchDebounce = useDebounce(searchValue, 300);

    useLayoutEffect(() => {
        const element = inputWrapRef.current;

        if (!element) return;

        const top = element.offsetTop;
        const height = element.clientHeight;

        setBoundingClientRect({
            top: top + height,
        });
    }, [width, height]);

    return (
        <div className="relative h-full flex flex-col">
            <HeaderPage title={t('chats.title')}>
                <div>
                    <div ref={inputWrapRef}>
                        <Input
                            value={searchValue}
                            onChangeText={setSearchValue}
                            Icon={SearchIcon}
                            placeholder={t('chats.searchPlaceholder')}
                        />
                    </div>
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

            <div
                style={{ top: `${boundClientRect.top}px` }}
                className="flex flex-col bg-sidebar-sub-bg dark:bg-dark-sidebar-sub-bg absolute left-0 right-0 bottom-0 z-1"
            >
                <ScrollbarCustomize>
                    <ChatsSearch searchValue={searchDebounce} />
                </ScrollbarCustomize>
            </div>
        </div>
    );
};

Chats.propTypes = {};

export default Chats;
