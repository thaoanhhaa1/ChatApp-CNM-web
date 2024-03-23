import PropTypes from 'prop-types';

const Item = ({ country, onClick = () => {} }) => {
    const handleClick = () => onClick(country);

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer px-2.5 py-2 flex gap-2.5 transition-colors hover:bg-black hover:bg-opacity-5"
        >
            <img
                className="w-4 object-contain"
                src={`${process.env.REACT_APP_FLAG_ENDPOINT}/${country.code.toLowerCase()}.png`}
                alt={country.name}
            />
            <span className="max-w-[150px] line-clamp-1 text-sm">{country.name}</span>
            <span className="text-sm text-secondary dark:text-dark-secondary">{country.dialling_code}</span>
        </div>
    );
};

Item.propTypes = {
    country: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default Item;
