import PropTypes from 'prop-types';

const CountryItem = ({ country, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="px-2.5 py-1 flex items-center justify-between text-sm leading-normal tracking-[0.2px] text-primary dark:text-dark-primary hover:bg-popup-item-hover-bg dark:hover:bg-dark-sidebar-bg transition-all rounded"
        >
            <span className="line-clamp-1">{country.name}</span>
            <span className="flex-shrink-0">{country.dialling_code}</span>
        </div>
    );
};

CountryItem.propTypes = {
    country: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default CountryItem;
