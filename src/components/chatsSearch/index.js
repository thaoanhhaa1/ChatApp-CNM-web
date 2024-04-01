import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
    const dispatch = useDispatch();

    const handleClickSearchUser = (user) => {
        dispatch(addRecentSearch(user));
    };

    return (
        <div className="pt-4">
            {searchValue ? (
                loadingContacts ? (
                    <>
                        <SearchItemSkeleton>
                            <List length={3} control={SearchUserSkeleton} />
                            <Skeleton
                                containerClassName="h-[53px] px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6"
                                width="100%"
                                height={32}
                            />
                        </SearchItemSkeleton>
                        <div className="pt-4 px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 text-sm text-center border-t border-separate dark:border-dark-separate">
                            {t('chats-search.search-description')}
                            {getDate(settings.loginAt)}.
                        </div>
                    </>
                ) : (
                    <SearchItem title={t('chats-search.contacts')}>
                        {contacts.length ? (
                            contacts.map((user) => (
                                <UserSearchResult
                                    onClick={() => handleClickSearchUser(user)}
                                    key={user._id}
                                    user={user}
                                />
                            ))
                        ) : (
                            <SearchEmpty />
                        )}
                    </SearchItem>
                )
            ) : (
                <SearchItem title={t('chats-search.search-recent')}>
                    {settings.recentSearch.length ? (
                        settings.recentSearch.map((user) => <RecentSearchUser key={user._id} user={user} />)
                    ) : (
                        <div className="px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 text-sm text-secondary dark:text-dark-secondary">
                            {t('chats-search.no-recent-search')}
                        </div>
                    )}
                </SearchItem>
            )}
        </div>
    );
};

ChatsSearch.propTypes = {
    searchValue: PropTypes.string.isRequired,
};

export default ChatsSearch;
