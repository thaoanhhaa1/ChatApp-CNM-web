import PropTypes from 'prop-types';

const Item = ({ title, contacts, render }) => {
    return (
        <>
            {!contacts.length || (
                <div>
                    <h6 className="px-2 ex:px-3 sm:px-4 text-mm text-primary-color font-bold leading-normal pt-2">
                        {title}
                    </h6>
                    <div>{contacts.map(render)}</div>
                </div>
            )}
        </>
    );
};

Item.propTypes = {
    title: PropTypes.string.isRequired,
    contacts: PropTypes.array.isRequired,
    render: PropTypes.func.isRequired,
};

export default Item;
