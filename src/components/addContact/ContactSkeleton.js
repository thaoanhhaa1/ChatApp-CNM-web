import Skeleton from '../skeleton';

const ContactSkeleton = () => {
    return (
        <div className="relative flex items-center gap-2 ex:gap-3 px-2 ex:px-3 sm:px-4 py-1 ex:py-1.5 sm:py-2">
            <Skeleton width={40} height={40} variant="circular" />
            <div className="flex-1">
                <Skeleton width="50%" height={15} containerClassName="h-[22.5px]" />
                <Skeleton width="60%" height={14} containerClassName="h-[21px]" />
            </div>
        </div>
    );
};

ContactSkeleton.propTypes = {};

export default ContactSkeleton;
