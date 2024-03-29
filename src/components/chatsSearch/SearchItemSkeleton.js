import PropTypes from 'prop-types';
import Skeleton from '../skeleton';

const SearchItemSkeleton = ({ children }) => {
    return (
        <div>
            <Skeleton width={100} height={14} containerClassName="px-2 ex:px-3 sm:px-4 md:px-5 dl:px-6 h-5" />
            <div className="mt-2">{children}</div>
        </div>
    );
};

SearchItemSkeleton.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SearchItemSkeleton;
