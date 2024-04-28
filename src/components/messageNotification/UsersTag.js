import PropTypes from 'prop-types';
import { Fragment } from 'react';
import UserTag from './UserTag';

const UsersTag = ({ users }) => {
    return (
        <>
            {users.map((user, index) => (
                <Fragment key={user._id}>
                    {index > 0 && ', '}
                    <UserTag user={user} />
                </Fragment>
            ))}
        </>
    );
};

UsersTag.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UsersTag;
