import PropTypes from 'prop-types';
import { CloseFillIcon } from '~/assets';
import Avatar from '~/components/avatar';
import ConversationAvatar from '../conversationAvatar';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const SelectedContact = ({ contact, onClose = () => {} }) => {
    return (
        <div className="px-1 h-8 flex gap-1 items-center rounded-full bg-primary-color bg-opacity-20">
            {contact.avatar ? (
                <Avatar
                    containerClassName="border border-white dark:border-[#232526] rounded-full"
                    size="24px"
                    src={contact.avatar}
                />
            ) : (
                <ConversationAvatar conversation={contact} size="24px" />
            )}
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

export default withErrorBoundary(SelectedContact, {
    fallback: null,
    onError: (error, info) => {
        toast.error('SelectedContact::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
