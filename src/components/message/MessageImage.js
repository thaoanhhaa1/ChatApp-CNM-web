import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DownloadLineIcon } from '~/assets';
import { useBoolean, useDownloadFile } from '~/hooks';
import { classNames } from '~/utils';
import ViewMediaFile from '../viewMediaFile';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const MessageImage = ({ imageInList = false, src, name, className }) => {
    const download = useDownloadFile(src, name);
    const { value: showViewImage, setTrue: setShowViewImage, setFalse: setHideViewImage } = useBoolean(false);

    const handleDownload = (e) => {
        e.stopPropagation();
        download();
    };

    const handleClickImage = (e) => {
        e.stopPropagation();

        setShowViewImage();
    };

    useEffect(() => {
        return () => URL.revokeObjectURL(src);
    }, [src]);

    return (
        <div
            onClick={handleClickImage}
            className={classNames(
                'relative cursor-pointer',
                imageInList || 'w-[370px] aspect-[3/2] border border-separate dark:border-dark-separate rounded',
                className,
            )}
        >
            <div className={classNames('flex justify-center items-center h-full', imageInList ? 'min-h-[50px]' : '')}>
                <LazyLoadImage
                    className={classNames('w-full h-full object-cover rounded min-h-[50px]')}
                    src={src}
                    alt={name}
                />
            </div>
            <div className="absolute bottom-0 ex:bottom-1 right-0 ex:right-1 flex gap-1 xs:gap-2">
                <button onClick={handleDownload} className="text-white p-1 xs:p-1.5">
                    <DownloadLineIcon className="w-[18px] h-[18px]" />
                </button>
            </div>

            {showViewImage && <ViewMediaFile name={name} onClose={setHideViewImage} url={src} title={name} />}
        </div>
    );
};

MessageImage.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageInList: PropTypes.bool,
    className: PropTypes.string,
};

export default withErrorBoundary(MessageImage, {
    fallback: null,
    onError: (error, info) => {
        toast.error('MessageImage::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
