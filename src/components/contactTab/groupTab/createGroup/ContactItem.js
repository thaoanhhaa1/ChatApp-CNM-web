import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import Avatar from '~/components/avatar';
import Checkbox from '~/components/checkbox';
import { classNames } from '~/utils';

const ContactItem = ({ added, checked, contact, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className={classNames(
                'cursor-pointer px-2 h-[52px] flex items-center gap-2 hover:bg-black hover:bg-opacity-5 rounded-md transition-colors duration-300',
                added && 'pointer-events-none',
            )}
        >
            <Checkbox className={classNames(added && 'opacity-50')} rounded checked={checked || added} />
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
        _id: PropTypes.string.isRequired,
    }).isRequired,
    added: PropTypes.bool,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
};

export default withErrorBoundary(ContactItem, {
    fallback: null,
    onError: (error, info) => {
        toast.error('ContactItem::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
