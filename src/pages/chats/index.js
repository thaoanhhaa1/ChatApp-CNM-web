import { useDebounce, useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SearchIcon } from '~/assets';
import Button from '~/components/button';
import ChatItem from '~/components/chatItem';
import ChatItemSkeleton from '~/components/chatItem/ChatItemSkeleton';
import ChatsSearch from '~/components/chatsSearch';
import EmptyChats from '~/components/emptyChats';
import HeaderPage from '~/components/headerPage';
import Input from '~/components/input';
import List from '~/components/list';
import OnlineUser from '~/components/onlineUser';
import ScrollbarCustomize from '~/components/scrollbarCustomize';
import { screens } from '~/constants';
import { getChats } from '~/features/chats/chatsSlice';
import { searchUsers, setSearch } from '~/features/search/searchSlice';
import { useBoolean } from '~/hooks';

// TODO Search
// TODO Click online user
const Chats = () => {
    const { t } = useTranslation();
    const { width, height } = useWindowSize();
    const { users: onlineUsers } = useSelector((state) => state.onlineUsers);
    const { chats, active, loading } = useSelector((state) => state.chats);
    const { search } = useSelector((state) => state.search);
    const [searchValue, setSearchValue] = useState('');
    const inputWrapRef = useRef();
    const [boundClientRect, setBoundingClientRect] = useState({ top: 0 });
    const { value: isShowSearch, setFalse: hideSearch, setTrue: showSearch } = useBoolean(false);
    const searchDebounce = useDebounce(searchValue, 300);
    const dispatch = useDispatch();

    const handleCloseSearch = () => {
        hideSearch();
        setSearchValue('');
    };

    useLayoutEffect(() => {
        const element = inputWrapRef.current;

        if (!element) return;

        const top = element.offsetTop;
        const height = element.clientHeight;

        setBoundingClientRect({
            top: top + height,
        });
    }, [width, height]);

    useEffect(() => {
        if (!searchDebounce || search === searchDebounce) return;

        dispatch(searchUsers(searchDebounce));
        dispatch(setSearch(searchDebounce));
    }, [dispatch, search, searchDebounce]);

    useEffect(() => {
        dispatch(getChats());
    }, [dispatch]);

    return (
        <div className="relative h-full flex flex-col">
            <HeaderPage title={t('chats.title')}>
                <div>
                    <div className="flex gap-1.5 items-center" ref={inputWrapRef}>
                        <Input
                            containerClassName="flex-1"
                            value={searchValue}
                            onChangeText={setSearchValue}
                            Icon={SearchIcon}
                            placeholder={t('chats.searchPlaceholder')}
                            onFocus={showSearch}
                        />
                        {isShowSearch && (
                            <Button onClick={handleCloseSearch} className="min-w-[72px] h-8">
                                {t('chats-search.close')}
                            </Button>
                        )}
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
                        {loading ? (
                            <List length={3} control={ChatItemSkeleton} />
                        ) : chats.length ? (
                            chats.map((chat) =>
                                chat.lastMessage ? (
                                    <ChatItem key={chat._id} chat={chat} active={chat._id === active?._id} />
                                ) : null,
                            )
                        ) : (
                            <EmptyChats />
                        )}
                    </div>
                </ScrollbarCustomize>
            </div>

            {isShowSearch && (
                <div
                    style={{ top: `${boundClientRect.top}px` }}
                    className="flex flex-col bg-sidebar-sub-bg dark:bg-dark-sidebar-sub-bg absolute left-0 right-0 bottom-0 z-1 pb-1 ex:pb-2 sm:pb-3 md:pb-4 dl:pb-5"
                >
                    <ScrollbarCustomize>
                        <ChatsSearch searchValue={searchDebounce} />
                    </ScrollbarCustomize>
                </div>
            )}
        </div>
    );
};

Chats.propTypes = {};

export default Chats;
