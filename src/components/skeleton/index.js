import { Skeleton as SkeletonLib } from '@mui/material';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Skeleton = ({ containerClassName, ...props }) => {
    return (
        <div className={classNames('flex items-center', containerClassName)}>
            <SkeletonLib animation="wave" {...props} />
        </div>
    );
};

Skeleton.propTypes = {
    containerClassName: PropTypes.string,
};

export default Skeleton;
