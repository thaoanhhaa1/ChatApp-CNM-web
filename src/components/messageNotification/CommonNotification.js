import PropTypes from 'prop-types';
import { Fragment } from 'react';
import UsersTag from './UsersTag';

const CommonNotification = ({ img, data }) => {
    return (
        <>
            {img && <img className="w-4 h-4" src={img} alt="" />}
            <span className="first-letter:uppercase">
                {data.map((item, index) => (
                    <Fragment key={index}>
                        {index > 0 && ' '}

                        {typeof item === 'string' ? item : <UsersTag users={item} />}
                    </Fragment>
                ))}
            </span>
        </>
    );
};

CommonNotification.propTypes = {
    img: PropTypes.string,
    data: PropTypes.array.isRequired,
};

export default CommonNotification;
