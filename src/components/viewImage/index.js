import PropTypes from 'prop-types';
import { CloseLineIcon, DownloadIcon, RotateLeft, RotateRight, ZoomInIcon, ZoomOutIcon } from '~/assets';
import Portal from '../portal';
import { useDownloadFile } from '~/hooks';
import { useState } from 'react';


const ViewImage = ({ title,name, url, onClose = () => {} }) => {
    const download = useDownloadFile(url, name);
    const [zoomLevel, setZoomLevel] = useState(100); // Mức độ phóng to ban đầu là 100%
    const [rotationAngle, setRotationAngle] = useState(0);

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => prevZoom + 30);
    };

    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 30, 30)); 
    };

    const handleRotateLeft = () => {
        setRotationAngle((prevAngle) => (prevAngle - 90) % 360);
    };

    const handleRotateRight = () => {
        setRotationAngle((prevAngle) => (prevAngle + 90) % 360);
    };
    return (
        <Portal>
            <div className="flex flex-col fixed inset-0 z-[52]">
                {/* Header */}
                <div className="h-[30px] relative flex justify-center items-center bg-[#2e2e2e] text-white z-10">
                    <span>{title}</span>
                    <span
                        onClick={onClose}
                        className="cursor-pointer h-full absolute top-0 right-0 w-9 flex justify-center items-center"
                    >
                        <CloseLineIcon />
                    </span>
                </div>

                {/* Body */}
                <div className="relative flex-1 bg-[#141414] w-full">
                    <div className="absolute inset-0 p-5 flex items-center justify-center">
                        <img src={url} alt="" style={{ transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg)`, }} className={`object-contain w-full h-full scale-${zoomLevel}`} />
                    </div>
                </div>

                <div className="h-14 bg-[#2e2e2e] relative">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <button onClick={download} className="text-white hover:bg-gray-300 hover:bg-opacity-30 mr-6">
                            <DownloadIcon />
                        </button>
                        <button onClick={handleZoomIn} className="text-white hover:bg-gray-300 hover:bg-opacity-30 mr-6">
                            <ZoomInIcon />
                        </button>
                        <button onClick={handleZoomOut} className="text-white hover:bg-gray-300 hover:bg-opacity-30 mr-6">
                            <ZoomOutIcon />
                        </button>
                        <button onClick={handleRotateLeft} className="text-white hover:bg-gray-300 hover:bg-opacity-30 mr-6">
                            <RotateLeft />
                        </button>
                        <button onClick={handleRotateRight} className="text-white hover:bg-gray-300 hover:bg-opacity-30 mr-6">
                            <RotateRight />
                        </button>
                    </div>
                </div>
            </div>

        </Portal>
    );
};

ViewImage.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default ViewImage;




