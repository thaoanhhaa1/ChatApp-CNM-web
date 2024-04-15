import PropTypes from 'prop-types';
import { useState } from 'react';
import { CloseLineIcon, DownloadIcon, RotateLeft, RotateRight, ZoomInIcon, ZoomOutIcon } from '~/assets';
import { useDownloadFile } from '~/hooks';
import Portal from '../portal';
import Button from './Button';

const ViewMediaFile = ({ title, name, url, type = 'image', onClose = () => {} }) => {
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

    const handleClose = (e) => {
        e.stopPropagation();
        setZoomLevel(100);
        setRotationAngle(0);
        onClose();
    };

    return (
        <Portal>
            <div className="flex flex-col fixed inset-0 z-[52]">
                {/* Header */}
                <div className="h-[30px] relative flex justify-center items-center bg-[#2e2e2e] text-white z-10">
                    <span>{title}</span>
                    <span
                        onClick={handleClose}
                        className="cursor-pointer h-full absolute top-0 right-0 w-9 flex justify-center items-center"
                    >
                        <CloseLineIcon />
                    </span>
                </div>

                {/* Body */}
                <div className="relative flex-1 bg-[#141414] w-full">
                    <div className="absolute inset-0 p-5 flex items-center justify-center">
                        {type === 'image' ? (
                            <img
                                src={url}
                                alt={name}
                                style={{ transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg)` }}
                                className={`object-contain w-full h-full scale-${zoomLevel}`}
                            />
                        ) : null}
                        {type === 'video' ? (
                            <video src={url} controls className="object-contain w-full h-full" />
                        ) : null}
                    </div>
                </div>

                <div className="h-14 bg-[#2e2e2e] relative">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Button onClick={download}>
                            <DownloadIcon />
                        </Button>
                        {type === 'image' ? (
                            <>
                                <Button onClick={handleZoomIn}>
                                    <ZoomInIcon />
                                </Button>
                                <Button onClick={handleZoomOut}>
                                    <ZoomOutIcon />
                                </Button>
                                <Button onClick={handleRotateLeft}>
                                    <RotateLeft />
                                </Button>
                                <Button onClick={handleRotateRight}>
                                    <RotateRight />
                                </Button>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

ViewMediaFile.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default ViewMediaFile;
