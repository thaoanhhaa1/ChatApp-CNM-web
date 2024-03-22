import PropTypes from 'prop-types';
import Button from '../button';

const ControlButton = ({ disabled, Icon, onClick = () => {} }) => {
    return (
        <Button disabled={disabled} className="w-6 !h-6 !min-w-6" small onClick={onClick}>
            <Icon className="flex-shrink-0" />
        </Button>
    );
};

ControlButton.propTypes = {
    disabled: PropTypes.bool,
    Icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

export default ControlButton;
