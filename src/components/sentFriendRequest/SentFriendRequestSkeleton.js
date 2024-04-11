import Skeleton from '../skeleton';

const SentFriendRequestSkeleton = () => {
    return (
        <div className="px-2 ex:px-3 sm:px-4 py-2 flex gap-2 items-center">
            <Skeleton variant="circular" width={36} height={36} containerClassName="flex-shrink-0" />
            <div className="flex-1 h-11">
                <Skeleton width="50%" height={14} containerClassName="h-5" />
                <Skeleton width="40%" height={13} containerClassName="h-[15px]" />
            </div>
            <Skeleton className="!rounded-full" width={100} height={31} />
        </div>
    );
};

SentFriendRequestSkeleton.propTypes = {};

export default SentFriendRequestSkeleton;
