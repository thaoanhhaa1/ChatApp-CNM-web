import PropTypes from 'prop-types';
import { More2FillIcon } from '~/assets';
import Popup from '../popup';
import SearchUser from './SearchUser';

const UserSearchResult = ({ user }) => {
    const popup = [
        {
            title: 'Ghim cuộc hội thoại',
        },
    ];

    return (
        <SearchUser
            user={user}
            control={
                <div>
                    <Popup data={popup} placement="bottom-start">
                        <span className="group-hover/recent-search:opacity-100 opacity-0 w-6 h-6 flex justify-center items-center text-secondary dark:text-secondary hover:text-primary-color transition-all">
                            <More2FillIcon className="w-4 h-4" />
                        </span>
                    </Popup>
                </div>
            }
        ></SearchUser>
    );
};

UserSearchResult.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserSearchResult;
