import Skeleton from '../skeleton';

const ContactGroupItemSkeleton = () => {
    return (
        <div className="flex gap-2.5 items-center p-2.5 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-300 rounded-md cursor-pointer">
            <Skeleton containerClassName="flex-shrink-0" width={36} height={36} variant="circular" />
            <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                    <Skeleton width="50%" height={14} containerClassName="h-5 flex-1" />
                    <Skeleton width={35} height={12} containerClassName="h-4" />
                </div>
                <Skeleton width="75%" height={13} containerClassName="h-[15px]" />
            </div>
        </div>
    );
};

ContactGroupItemSkeleton.propTypes = {};

export default ContactGroupItemSkeleton;
