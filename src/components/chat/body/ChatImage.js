import PropTypes from 'prop-types';
import { DownloadLineIcon, MoreFillIcon } from '~/assets';

const ChatImage = ({ src }) => {
    return (
        <div className="relative max-w-[150px] aspect-[3/2] border border-separate dark:border-dark-separate rounded overflow-hidden">
            <img className="w-full h-full object-cover" src={src} alt="" />
            <div className="absolute bottom-0 ex:bottom-1 right-0 ex:right-1 flex gap-1 xs:gap-2">
                <button className="text-white p-1 xs:p-1.5">
                    <DownloadLineIcon className="w-[18px] h-[18px]" />
                </button>
                <button className="text-white p-1 xs:p-1.5">
                    <MoreFillIcon className="w-[18px] h-[18px]" />
                </button>
            </div>
        </div>
    );
};

ChatImage.propTypes = {
    src: PropTypes.string.isRequired,
};

export default ChatImage;
