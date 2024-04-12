import Skeleton from '../skeleton';

const ContactItemSkeleton = () => {
    return (
        <div className="p-1.5 sm:p-2.5 flex items-center gap-2 rounded-md">
            <Skeleton width={36} height={36} variant="circular" containerClassName="flex-shrink-0" />
            <Skeleton width="50%" height={14} containerClassName="flex-1 h-5" />
            <div className="flex items-center gap-2">
                <Skeleton width={16} height={16} />
                <Skeleton width={16} height={16} />
                <Skeleton width={16} height={16} />
            </div>
        </div>
    );
};

ContactItemSkeleton.propTypes = {};

export default ContactItemSkeleton;
