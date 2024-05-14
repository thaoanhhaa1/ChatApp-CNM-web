import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const List = ({ length = 1, control, direction = 'column' }) => {
    const Control = control;

    return (
        <div className={classNames('flex', direction === 'column' && 'flex-col')}>
            {new Array(length).fill(null).map((_item, index) => (
                <Control key={index} />
            ))}
        </div>
    );
};

List.propTypes = {
    length: PropTypes.number,
    control: PropTypes.elementType.isRequired,
    direction: PropTypes.oneOf(['column', 'row']),
};

export default List;
