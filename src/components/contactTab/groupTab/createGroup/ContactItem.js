import PropTypes from 'prop-types';
import Avatar from '~/components/avatar';
import Checkbox from '~/components/checkbox';

const ContactItem = ({ checked, contact, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer px-2 h-[52px] flex items-center gap-2 hover:bg-black hover:bg-opacity-5 rounded-md transition-colors duration-300"
        >
            <Checkbox rounded checked={checked} />
            <Avatar className="flex-shrink-0" src={contact.avatar} />
            <div className="flex-1 text-sm line-clamp-1">{contact.alias || contact.name}</div>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        alias: PropTypes.string,
        id: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
};

export default ContactItem;
