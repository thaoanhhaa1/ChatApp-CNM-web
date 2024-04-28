import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getConversation, setActive } from '~/features/chats/chatsSlice';
import { addRecentSearch } from '~/features/localSetting/localSettingSlice';
import { getDate } from '~/utils';
import List from '../list';
import Skeleton from '../skeleton';
import RecentSearchUser from './RecentSearchUser';
import SearchEmpty from './SearchEmpty';
import SearchItem from './SearchItem';
import SearchItemSkeleton from './SearchItemSkeleton';
import SearchUserSkeleton from './SearchUserSkeleton';
import UserSearchResult from './UserSearchResult';

const ChatsSearch = ({ searchValue }) => {
    const { t } = useTranslation();
    const { settings } = useSelector((state) => state.localSetting);
    const { contacts, loadingContacts } = useSelector((state) => state.search);
    const { chats } = useSelector((state) => state.chats);
    const { socket } = useSelector((state) => state.socket);
    const { user: me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleClickUser = async (user) => {
        const chat = chats.find((chat) => !chat.isGroup && chat.users.find((u) => u._id === user._id));

        console.log('handleClickUser:: ', chat);
        dispatch(addRecentSearch(user));

        if (chat) {
            // conversation loaded
            dispatch(setActive(chat));
            socket.emit('openConversation', {
                conversation: chat,
                user: me,
            });
        } else {
            // conversation not load
            try {
                const data = await dispatch(getConversation(user._id)).unwrap();

                console.log(data);

                socket.emit('openConversation', {
                    conversation: data,
                    user: me,
                });
            } catch (error) {
                console.error(error);

                toast.error(t('request-error'));
            }
        }
    };

    return (
        <div className="pt-4">
            {searchValue ? (
                loadingContacts ? (
                    <SearchItemSkeleton>
                        <List length={3} control={SearchUserSkeleton} />
                        <Skeleton
                            containerClassName="h-[53px] px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6"
                            width="100%"
                            height={32}
                        />
                    </SearchItemSkeleton>
                ) : (
                    <SearchItem title={t('chats-search.contacts')}>
                        {contacts.length ? (
                            contacts.map((user) => (
                                <UserSearchResult onClick={() => handleClickUser(user)} key={user._id} user={user} />
                            ))
                        ) : (
                            <SearchEmpty />
                        )}
                    </SearchItem>
                )
            ) : (
                <SearchItem title={t('chats-search.search-recent')}>
                    {settings.recentSearch.length ? (
                        settings.recentSearch.map((user) => (
                            <RecentSearchUser onClick={() => handleClickUser(user)} key={user._id} user={user} />
                        ))
                    ) : (
                        <div className="px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 text-sm text-secondary dark:text-dark-secondary">
                            {t('chats-search.no-recent-search')}
                        </div>
                    )}
                </SearchItem>
            )}

            {searchValue && (contacts.length || loadingContacts) ? (
                <div className="pt-4 px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 text-sm text-center border-t border-separate dark:border-dark-separate text-secondary dark:text-dark-secondary">
                    {t('chats-search.search-description')}
                    {getDate(settings.loginAt)}.
                </div>
            ) : null}
        </div>
    );
};

ChatsSearch.propTypes = {
    searchValue: PropTypes.string.isRequired,
};

export default ChatsSearch;
