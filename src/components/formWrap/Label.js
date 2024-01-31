import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Label = ({ className, ...props }) => {
    return (
        <label
            {...props}
            className={classNames(
                'cursor-pointer text-mm font-medium leading-normal text-primary dark:text-dark-primary',
                className,
            )}
        />
    );
};

Label.propTypes = {
    className: PropTypes.string,
};

export default Label;
