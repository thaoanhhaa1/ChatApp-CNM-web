import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DownloadLineIcon } from '~/assets';
import { useDownloadFile } from '~/hooks';
import { classNames } from '~/utils';

const MessageImage = ({ imageInList = false, loading = false, src, name, className }) => {
    const download = useDownloadFile(src, name);

    const handleLoadImage = () => URL.revokeObjectURL(src);

    return (
        <div
            className={classNames(
                'relative',
                imageInList || 'w-[150px] aspect-[3/2] border border-separate dark:border-dark-separate rounded',
                className,
            )}
        >
            <div className="relative flex justify-center items-center h-full">
                <LazyLoadImage
                    onLoad={handleLoadImage}
                    className={classNames('w-full h-full object-cover rounded', loading && 'blur-sm')}
                    src={src}
                    alt={name}
                />
                {loading && (
                    <div className="absolute w-10 h-10 border-2 border-transparent border-t-primary-color rounded-full animate-spin"></div>
                )}
            </div>
            <div className="absolute bottom-0 ex:bottom-1 right-0 ex:right-1 flex gap-1 xs:gap-2">
                <button onClick={download} className="text-white p-1 xs:p-1.5">
                    <DownloadLineIcon className="w-[18px] h-[18px]" />
                </button>
            </div>
        </div>
    );
};

MessageImage.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    imageInList: PropTypes.bool,
    className: PropTypes.string,
};

export default MessageImage;
