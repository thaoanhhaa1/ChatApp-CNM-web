import Skeleton from '../skeleton';

const ItemSkeleton = () => {
    return (
        <div className="px-2 h-[52px] flex items-center gap-2 rounded-md">
            <Skeleton width={20} height={20} variant="circular" />
            <Skeleton width={36} height={36} variant="circular" />
            <Skeleton width="50%" height={14} containerClassName="h-5 flex-1" />
        </div>
    );
};

ItemSkeleton.propTypes = {};

export default ItemSkeleton;
