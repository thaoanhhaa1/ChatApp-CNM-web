import { Skeleton as SkeletonLib } from '@mui/material';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Skeleton = ({ containerClassName, className, variant = 'text', ...props }) => {
    return (
        <div className={classNames('flex items-center', containerClassName)}>
            <SkeletonLib className={classNames(className)} animation="wave" variant={variant} {...props} />
        </div>
    );
};

Skeleton.propTypes = {
    containerClassName: PropTypes.string,
    variant: PropTypes.oneOf(['text', 'circular', 'rectangular', 'rounded']),
    className: PropTypes.string,
};

export default Skeleton;
