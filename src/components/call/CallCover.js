import PropTypes from 'prop-types';
import Avatar from '../avatar';

const CallCover = ({ user }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
                <div
                    className="absolute inset-0 bg-cover bg-center blur-[8px] w-full h-full"
                    style={{
                        backgroundImage: `url(${user.avatar})`,
                    }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <Avatar
                        src={user.avatar}
                        size="50%"
                        className="border-[5px] border-gray-500 border-opacity-20"
                        containerClassName="!w-unset aspect-square"
                    />

                    <span className="text-white">Đang đổ chuông...</span>
                </div>
                <span style={{ backgroundColor: 'black', opacity: 0.5 }} className="absolute bottom-0 left-0 text-white">{user.name}</span>


            </div>
        </div>
    );
};

CallCover.propTypes = {
    user: PropTypes.object.isRequired,
};

export default CallCover;

