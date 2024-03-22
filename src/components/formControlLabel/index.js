import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const FormControlLabel = ({ label, labelPlacement = 'right', control, className }) => {
    return (
        <label
            className={classNames(
                'flex gap-2 cursor-pointer',
                ['right', 'left'].includes(labelPlacement) ? 'items-center' : 'flex-col justify-center',
                className,
            )}
        >
            <span className={classNames(['top', 'left'].includes(labelPlacement) && 'order-1')}>{control}</span>
            <span className="text-sm leading-normal">{label}</span>
        </label>
    );
};

FormControlLabel.propTypes = {
    label: PropTypes.string.isRequired,
    control: PropTypes.node.isRequired,
    labelPlacement: PropTypes.string,
    className: PropTypes.string,
};

export default FormControlLabel;
