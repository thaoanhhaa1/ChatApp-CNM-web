import PropTypes from 'prop-types';
import { CloseLineIcon } from '~/assets';
import SearchUser from './SearchUser';

const RecentSearchUser = ({ user }) => {
    return (
        <SearchUser
            user={user}
            control={
                <span className="group-hover/recent-search:opacity-100 opacity-0 w-6 h-6 flex justify-center items-center text-secondary dark:text-secondary hover:text-primary-color transition-all">
                    <CloseLineIcon className="w-4 h-4" />
                </span>
            }
        />
    );
};

RecentSearchUser.propTypes = {
    user: PropTypes.object.isRequired,
};

export default RecentSearchUser;
