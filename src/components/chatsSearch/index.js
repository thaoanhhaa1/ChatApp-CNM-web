import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RecentSearchUser from './RecentSearchUser';
import SearchEmpty from './SearchEmpty';
import SearchItem from './SearchItem';
import UserSearchResult from './UserSearchResult';

const ChatsSearch = ({ searchValue }) => {
    const { t } = useTranslation();
    const [users] = useState([
        {
            id: 1,
            name: 'Alice',
            avatar: 'https://plus.unsplash.com/premium_photo-1711134826547-169d7de16190?q=80&w=1823&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 2,
            name: 'Bob',
            avatar: 'https://plus.unsplash.com/premium_photo-1711134826547-169d7de16190?q=80&w=1823&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 3,
            name: 'Charlie',
            avatar: 'https://plus.unsplash.com/premium_photo-1711134826547-169d7de16190?q=80&w=1823&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 4,
            name: 'David',
            avatar: 'https://plus.unsplash.com/premium_photo-1711134826547-169d7de16190?q=80&w=1823&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 5,
            name: 'Eve',
            avatar: 'https://plus.unsplash.com/premium_photo-1711134826547-169d7de16190?q=80&w=1823&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]);
    const [searchUsers, setSearchUsers] = useState([]);

    return (
        <div className="pt-4 pb-1 ex:pb-2 sm:pb-3 md:pb-4 dl:pb-5">
            {searchValue ? (
                <SearchItem title={t('chats-search.contacts')}>
                    {searchUsers.length ? (
                        searchUsers.map((user) => <UserSearchResult key={user.id} user={user} />)
                    ) : (
                        <SearchEmpty />
                    )}
                </SearchItem>
            ) : (
                <SearchItem title={t('chats-search.search-recent')}>
                    {users.length ? (
                        users.map((user) => <RecentSearchUser key={user.id} user={user} />)
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
