import PropTypes from 'prop-types';
import Avatar from '../avatar';

const Member = ({ user }) => {
    return (
        <div className="p-2 flex gap-2 items-center">
            <Avatar src={user.avatar} />
            <h5 className="text-sm font-semibold">{user.name}</h5>
            {user.role && (
                <span className="block px-1.5 py-[2px] rounded text-ex text-[#ef476f] bg-[rgba(239,71,111,.18)]">
                    Admin
                </span>
            )}
        </div>
    );
};

Member.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Member;
