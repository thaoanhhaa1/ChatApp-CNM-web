import PropTypes from 'prop-types';
import Button from '~/components/button';
import { classNames } from '~/utils';

const ArrowButton = ({ Icon, className, onClick = () => {}, ...props }) => {
    return (
        <Button
            onClick={onClick}
            className={classNames(
                '!w-8 !min-w-8 h-8 rounded-lg flex-shrink-0 hover:bg-black hover:bg-opacity-10',
                className,
            )}
            {...props}
        >
            <Icon className="w-5 h-5" />
        </Button>
    );
};

ArrowButton.propTypes = {
    Icon: PropTypes.func.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default ArrowButton;
