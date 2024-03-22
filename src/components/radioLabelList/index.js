import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import RadioLabel from './RadioLabel';

const RadioLabelList = ({ name, list, className, onChange }) => {
    return (
        <div className={classNames('flex gap-2 flex-wrap', className)}>
            {list.map((item) => (
                <RadioLabel key={item.value} name={name} onChange={onChange} {...item} />
            ))}
        </div>
    );
};

RadioLabelList.propTypes = {
    name: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default RadioLabelList;
