import PropTypes from 'prop-types';
import List from '../list';
import Skeleton from '../skeleton';

const PhoneBookSkeleton = ({ render }) => {
    return (
        <div>
            <Skeleton width={20} height={15} containerClassName="h-[22.5px] px-2 ex:px-3 sm:px-4 pt-2" />
            <div>
                <List control={render} length={3} />
            </div>
        </div>
    );
};

PhoneBookSkeleton.propTypes = {
    render: PropTypes.func.isRequired,
};

export default PhoneBookSkeleton;
