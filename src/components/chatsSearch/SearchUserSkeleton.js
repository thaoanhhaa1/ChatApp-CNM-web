import Skeleton from '../skeleton';

const SearchUserSkeleton = () => {
    return (
        <div className="px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 py-2 flex items-center gap-3">
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton width="70%" height={16} containerClassName="flex-1" />
        </div>
    );
};

SearchUserSkeleton.propTypes = {};

export default SearchUserSkeleton;
