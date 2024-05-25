import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import RadioLabel from './RadioLabel';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

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

export default withErrorBoundary(RadioLabelList, {
    fallback: null,
    onError: (error, info) => {
        toast.error('RadioLabelList::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
