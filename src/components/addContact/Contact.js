import PropTypes from 'prop-types';
import { CloseFillIcon } from '~/assets';
import { classNames } from '~/utils';
import Avatar from '../avatar';

const Contact = ({ avatar, name, description, right, onClick = () => {}, onClose = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="group/contact relative flex items-center gap-3 px-4 py-2 hover:bg-[#eaedf0] ease-linear duration-300 cursor-pointer"
        >
            <Avatar alt={name} src={avatar} size="40px" />
            <div className="flex-1">
                <div className="text-mm leading-normal line-clamp-1">{name}</div>
                <p className="text-sm leading-normal text-secondary dark:text-dark-secondary line-clamp-1">
                    {description}
                </p>
            </div>
            {right}
            <span
                onClick={onClose}
                className={classNames(
                    'opacity-0 group-hover/contact:opacity-100 hover:text-primary-color text-secondary transition-all duration-300',
                    right ? 'absolute p-2.5 right-1.5 -top-1.5' : 'p-1',
                )}
            >
                <CloseFillIcon className={classNames(right && 'w-3 h-3')} />
            </span>
        </div>
    );
};

Contact.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    right: PropTypes.node,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
};

export default Contact;
