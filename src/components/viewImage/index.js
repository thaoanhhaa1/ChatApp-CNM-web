import PropTypes from 'prop-types';
import { CloseLineIcon } from '~/assets';
import Portal from '../portal';

const ViewImage = ({ title, url, onClose = () => {} }) => {
    return (
        <Portal>
            <div className="flex flex-col fixed inset-0 z-[52]">
                {/* Header */}
                <div className="h-[30px] relative flex justify-center items-center bg-[#2e2e2e] text-white">
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
                    <div className="absolute inset-0 p-5">
                        <img className="object-contain w-full h-full" src={url} alt="" />
                    </div>
                </div>

                {/* Footer */}
                <div className="h-14 bg-[#2e2e2e]"></div>
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
