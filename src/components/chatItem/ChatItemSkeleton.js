import Skeleton from '../skeleton';

const ChatItemSkeleton = () => {
    return (
        <div className="px-2.5 dl:px-5 py-1.5 dl:py-4 flex items-center gap-2.5 dl:gap-4">
            <Skeleton width={36} height={36} variant="circular" />
            <div className="flex-1 flex justify-between">
                <div className="flex-1">
                    <Skeleton width="50%" height={14} containerClassName="py-0.5 mb-1" />
                    <Skeleton width="70%" height={14} containerClassName="h-4" />
                </div>
                <div className="flex flex-col justify-center items-end">
                    <Skeleton width={50} height={11} containerClassName="h-[16.5px]" />
                    <Skeleton width={22} height={20} variant="circular" />
                </div>
            </div>
        </div>
    );
};

ChatItemSkeleton.propTypes = {};

export default ChatItemSkeleton;
