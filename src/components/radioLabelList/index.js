import PropTypes from 'prop-types';
import RadioLabel from './RadioLabel';

const RadioLabelList = ({ name, list, onChange }) => {
    return (
        <div className="flex gap-2 flex-wrap">
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
};

export default RadioLabelList;
