import PropTypes from 'prop-types';
import Avatar from '~/components/avatar';
import Radio from '~/components/radioGroup/Radio';

const UserItem = ({ user, checked, onChange }) => {
    return (
        <label className="px-4 h-16 flex items-center cursor-pointer">
            <Radio checked={checked} onChange={onChange} value={user._id} name="owner-id" />
            <Avatar containerClassName="ml-3" src={user.avatar} />
            <div className="flex-1 text-sm font-medium ml-2.5 line-clamp-1">{user.name}</div>
        </label>
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default UserItem;
