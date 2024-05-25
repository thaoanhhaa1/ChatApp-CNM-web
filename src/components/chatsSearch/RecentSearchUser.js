import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CloseLineIcon } from '~/assets';
import { removeRecentSearch } from '~/features/localSetting/localSettingSlice';
import SearchUser from './SearchUser';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const RecentSearchUser = ({ user, onClick = () => {} }) => {
    const dispatch = useDispatch();

    const handleRemoveRecentUser = () => dispatch(removeRecentSearch(user._id));

    return (
        <SearchUser
            onClick={onClick}
            user={user}
            control={
                <span
                    onClick={handleRemoveRecentUser}
                    className="group-hover/recent-search:opacity-100 opacity-0 w-6 h-6 flex justify-center items-center text-secondary dark:text-secondary hover:text-primary-color transition-all"
                >
                    <CloseLineIcon className="w-4 h-4" />
                </span>
            }
        />
    );
};

RecentSearchUser.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default withErrorBoundary(RecentSearchUser, {
    fallback: null,
    onError: (error, info) => {
        toast.error('RecentSearchUser::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
