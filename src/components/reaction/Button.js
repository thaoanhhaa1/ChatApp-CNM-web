import PropTypes from 'prop-types';
import { classNames } from '~/utils';

const Button = ({ item, active, onClick = () => {} }) => {
    const handleClick = () => onClick(item);

    return (
        <button
            onClick={handleClick}
            className={classNames('w-9 h-9 p-0.5 rounded-[25%]', active && 'bg-[#E4E6EB] dark:bg-dark-sidebar-bg')}
        >
            <img className="w-full h-full object-contain object-center" src={item.url} alt="" />
        </button>
    );
};

Button.propTypes = {
    item: PropTypes.object.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
