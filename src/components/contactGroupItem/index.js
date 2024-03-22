import PropTypes from 'prop-types';
import { getDateTimeContactGroup } from '~/utils';
import Avatar from '../avatar';

const ContactGroupItem = ({ group }) => {
    return (
        <div className="flex gap-2.5 items-center p-2.5 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-all duration-300 rounded-md cursor-pointer">
            <Avatar src={group.avatar} />
            <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium">{group.name}</div>
                    <span className="text-xs font-medium">{getDateTimeContactGroup(new Date(group.date))}</span>
                </div>
                <p className="line-clamp-1 text-ss text-secondary dark:text-dark-secondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident odio aperiam facilis maiores
                    ullam dicta iusto veniam sunt assumenda minima, fugit molestiae magnam numquam accusantium quia,
                    voluptate tenetur omnis pariatur!
                </p>
            </div>
        </div>
    );
};

ContactGroupItem.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default ContactGroupItem;
