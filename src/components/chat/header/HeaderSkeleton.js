import Skeleton from '~/components/skeleton';

const HeaderSkeleton = () => {
    const ActionSkeleton = () => <Skeleton containerClassName="w-10 h-10" width={20} height={20} />;

    return (
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 dl:p-5 border-b border-separate dark:border-dark-separate">
            <div className="flex gap-2 sm:gap-4 items-center">
                <button className="w-9 h-9 flex dl:hidden justify-center items-center -mr-2">
                    <Skeleton width={16} height={16} />
                </button>
                <Skeleton containerClassName="flex-shrink-0" width={36} height={36} variant="circular" />
                <Skeleton containerClassName="flex-shrink-0" width={150} height={16} />
                <Skeleton containerClassName="flex-shrink-0 -ml-1 sm:-ml-2" width={10} height={10} />
            </div>
            <div className="flex gap-2">
                <ActionSkeleton />

                <div className="dl:flex gap-2 hidden">
                    <ActionSkeleton />
                    <ActionSkeleton />
                    <ActionSkeleton />
                </div>

                <ActionSkeleton />
            </div>
        </div>
    );
};

export default HeaderSkeleton;
