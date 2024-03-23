import PropTypes from 'prop-types';
import { CloseFillIcon } from '~/assets';
import Avatar from '~/components/avatar';

const SelectedContact = ({ contact, onClose = () => {} }) => {
    return (
        <div className="px-1 h-8 flex gap-1 items-center rounded-full bg-primary-color bg-opacity-20">
            <Avatar
                containerClassName="border border-white dark:border-[#232526] rounded-full"
                size="24px"
                src={contact.avatar}
            />
            <span className="flex-1 text-sm text-primary-color line-clamp-1">{contact.alias || contact.name}</span>
            <span onClick={onClose} className="ml-1 text-primary-color cursor-pointer">
                <CloseFillIcon className="w-[18px] h-[18px]" />
            </span>
        </div>
    );
};

SelectedContact.propTypes = {
    contact: PropTypes.object.isRequired,
    onClose: PropTypes.func,
};

export default SelectedContact;
