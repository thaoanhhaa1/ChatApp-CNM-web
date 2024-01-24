import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../avatar';

const OnlineUser = ({ data }) => {
    const handleClick = () => console.log(data);

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer flex-shrink-0 select-none mt-[18px] flex flex-col items-center gap-1 w-[71px] h-[51px] p-2 bg-light dark:bg-dark-separate rounded-lg"
        >
            <Avatar containerClassName="-mt-[18px]" src={data.avatar} status="ONLINE" />
            <h5 className="line-clamp-1 text-ss font-medium">{data.name}</h5>
        </div>
    );
};

OnlineUser.propTypes = {
    data: PropTypes.object.isRequired,
};

export default OnlineUser;
