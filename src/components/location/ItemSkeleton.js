import Skeleton from '../skeleton';

const ItemSkeleton = () => (
    <div className="flex items-center gap-3 px-3">
        <Skeleton width={32} height={32} variant="circular" />
        <div className="border-b border-separate py-2 flex-1">
            <Skeleton width="30%" height={14} containerClassName="h-5" />
            <Skeleton width="50%" height={13} containerClassName="h-[15]" />
        </div>
    </div>
);

ItemSkeleton.propTypes = {};

export default ItemSkeleton;
