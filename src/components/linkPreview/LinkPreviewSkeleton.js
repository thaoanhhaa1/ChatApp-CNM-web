import Skeleton from '../skeleton';

const LinkPreviewSkeleton = () => (
    <div className="w-[300px] rounded mt-[14px]">
        <div>
            <Skeleton width={300} height={157} />
            <div className="mt-3">
                <Skeleton containerClassName="h-5" width="50%" height={14} />
                <Skeleton containerClassName="h-5" width="100%" height={14} />
                <Skeleton containerClassName="h-5" width="100%" height={14} />
            </div>
        </div>
    </div>
);

export default LinkPreviewSkeleton;
