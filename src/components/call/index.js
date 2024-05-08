import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CloseLineIcon, DownloadIcon, MicFillIcon, MicIcon, MicStopIcon, MinusIcon, PhoneFillIcon, PhoneLineIcon, SquareFullIcon, VideoFillIcon, VideoStopIcon } from '~/assets'; // Chỉ import những biểu tượng cần thiết
import Modal from '../modal';
import Button from './Button';
import Portal from '../portal';
import Avatar from '../avatar';

const Call = ({ users, isVideoCall, show, onClose = () => { }, onAccept = () => { } }) => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.user);
    const usersWithoutMe = users.filter((u) => u._id !== user._id);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(show);
    }, [show]);

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);


    const handleToggleVideo = () => {
        setIsVideoPlaying(prevState => !prevState);
    };

    const handleToggleMic = () => {
        setIsMicOn(prevState => !prevState);
    };

    return (
        <Portal>
            <div className={`flex flex-col fixed inset-0 z-[52] ${modalVisible ? '' : 'hidden'}`}>
                {/* Header */}
                <div className="h-[45px] relative flex justify-end items-center bg-white text-white z-10">
                    <span className="cursor-pointer w-9 flex justify-center items-center">
                        <MinusIcon className="text-black w-[13px[] h-[13px]" />
                    </span>
                    <span className="cursor-pointer w-9 flex justify-center items-center">
                        <SquareFullIcon className="text-black w-[13px[] h-[13px]" />
                    </span>
                    <span className="cursor-pointer w-9 flex justify-center items-center" onClick={onClose}>
                        <CloseLineIcon className="text-black" />
                    </span>
                </div>

                <div className="relative flex-1 w-full flex justify-center bg-[#FFFFFF]">
                    <div className="grid grid-cols-2 gap-[-1] w-full">
                        {/* <div className={`grid grid-cols-${numColumns} gap-1 w-full`}> */}
                        {/* Hiển thị nội dung cho từng người dùng */}
                        {users.map((user, index) => (
                            <div key={user._id} className="flex flex-col items-center justify-center">
                                <div className="relative w-full h-full">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center blur-lg"
                                        style={{
                                            backgroundImage: `url(${user.avatar})`,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Avatar src={user.avatar} size="150px" className="border-[5px] border-gray-500 border-opacity-20" />
                                        <span className="mt-[180px] text-white absolute">Đang đổ chuông...</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-[50px] bg-[#2e2e2e] relative">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Button onClick={handleToggleVideo}>
                            {isVideoPlaying ? <VideoStopIcon /> : <VideoFillIcon />}
                        </Button>
                        <Button className="relative">
                            <span className="absolute bg-red-500 rounded-full h-8 w-8 flex justify-center items-center">
                                <PhoneFillIcon className='text-white' style={{ fontSize: '20px', position: 'relative' }} />
                            </span>
                        </Button>
                        <Button onClick={handleToggleMic}>
                            {isMicOn ? <MicStopIcon /> : <MicFillIcon className="w-[20px] h-[20px]" />}
                        </Button>
                    </div>
                </div>
            </div>
        </Portal >
    );
};

Call.propTypes = {
    isVideoCall: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
};

export default Call;
