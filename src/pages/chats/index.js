import { useDebounce, useWindowSize } from '@uidotdev/usehooks';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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
import { setMessages } from '~/features/messages/messagesSlice';
import { searchUsers, setSearch } from '~/features/search/searchSlice';
import { useBoolean } from '~/hooks';
import { location } from '~/utils';

location.getCoords().then().catch();

// TODO Click online user
// TODO Delete conversation
const Chats = () => {
    const { t } = useTranslation();
    const { width, height } = useWindowSize();
    const { users: onlineUserIds } = useSelector((state) => state.onlineUsers);
    const { chats, active, loading } = useSelector((state) => state.chats);
    const { search } = useSelector((state) => state.search);
    const { friendList } = useSelector((state) => state.friend);
    const [searchValue, setSearchValue] = useState('');
    const inputWrapRef = useRef();
    const [boundClientRect, setBoundingClientRect] = useState({ top: 0 });
    const { value: isShowSearch, setFalse: hideSearch, setTrue: showSearch } = useBoolean(false);
    const searchDebounce = useDebounce(searchValue, 300);
    const chatsCanShow = useMemo(() => chats.filter((chat) => chat.lastMessage), [chats]);
    const onlineUsers = useMemo(
        () => friendList.filter((friend) => onlineUserIds.includes(friend._id)),
        [friendList, onlineUserIds],
    );
    const dispatch = useDispatch();

    const handleCloseSearch = useCallback(() => {
        hideSearch();
        setSearchValue('');
    }, [hideSearch]);

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
        dispatch(setMessages([]));
    }, [active?._id, dispatch]);

    useEffect(() => {
        active?.lastMessage && handleCloseSearch();
    }, [active?.lastMessage, handleCloseSearch]);

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
                            <Button onClick={handleCloseSearch} className="min-w-[72px] h-8 font-semibold">
                                {t('chats-search.close')}
                            </Button>
                        )}
                    </div>
                    <Swiper spaceBetween={width < screens.SM ? 8 : 16} slidesPerView="auto" className="mt-2 sm:mt-4">
                        {onlineUsers.map((item) => (
                            <SwiperSlide className="!w-fit" key={item._id}>
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
                        ) : chatsCanShow.length ? (
                            chatsCanShow.map((chat) => (
                                <ChatItem key={chat._id} chat={chat} active={chat._id === active?._id} />
                            ))
                        ) : (
                            <EmptyChats />
                        )}
                    </div>
                </ScrollbarCustomize>
            </div>

            {isShowSearch && (
                <div
                    style={{ top: `${boundClientRect.top}px` }}
                    className="flex flex-col bg-sidebar-sub-bg dark:bg-dark-sidebar-sub-bg absolute left-0 right-0 bottom-0 z-10 pb-1 ex:pb-2 sm:pb-3 md:pb-4 dl:pb-5"
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

export default withErrorBoundary(Chats, {
    fallback: null,
    onError: (error, info) => {
        toast.error('Chats::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
