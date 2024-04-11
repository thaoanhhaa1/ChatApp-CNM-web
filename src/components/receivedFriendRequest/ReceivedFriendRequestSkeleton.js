import Skeleton from '../skeleton';

const ReceivedFriendRequestSkeleton = () => {
    return (
        <div className="flex items-start gap-2 px-2 ex:px-3 sm:px-4 py-2">
            <Skeleton containerClassName="flex-shrink-0" width={36} height={36} variant="circular" />
            <div className="flex flex-col gap-2 flex-1">
                <div className="h-11 flex flex-col justify-center">
                    <Skeleton width="50%" height={14} containerClassName="h-5" />
                    <Skeleton width="40%" height={13} containerClassName="h-[15px]" />
                </div>
                <Skeleton width="100%" height={33} />
                <div className="flex gap-2">
                    <Skeleton className="!rounded-full" width={100} height={31} />
                    <Skeleton className="!rounded-full" width={100} height={31} />
                </div>
            </div>
        </div>
    );
};

ReceivedFriendRequestSkeleton.propTypes = {};

export default ReceivedFriendRequestSkeleton;
