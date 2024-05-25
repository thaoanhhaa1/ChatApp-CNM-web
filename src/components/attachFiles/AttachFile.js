import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CloseFilledIcon } from '~/assets';
import { removeFile } from '~/features/chat/chatSlice';
import { classNames, getBgByTypeFile, isImageFileByType } from '~/utils';

const AttachFile = ({ file }) => {
    const dispatch = useDispatch();
    const isRenderImage = isImageFileByType(file.type || file.contentType);
    const bgImage = useMemo(
        () => (isRenderImage ? URL.createObjectURL(file) : getBgByTypeFile(file.name)),
        [file, isRenderImage],
    );

    const handleRemoveFile = () => dispatch(removeFile(file.id));

    const handleLoad = () => URL.revokeObjectURL(bgImage);

    return (
        <div className="flex justify-center items-center cursor-pointer w-[100px] h-[100px] rounded-md border border-[#d6dbe1] dark:border-dark-separate relative overflow-hidden">
            {isRenderImage || (
                <div className="h-6 text-nowrap text-ellipsis overflow-hidden absolute bottom-0 left-0 right-0 px-1 py-0.5 text-ss leading-normal text-center bg-black bg-opacity-50 dark:bg-opacity-70 text-white">
                    {file.name}
                </div>
            )}
            <span
                onClick={handleRemoveFile}
                className="absolute top-0.5 right-0.5 text-[#7589a3] dark:text-[#9e9f9f] hover:text-[#005ae0] dark:hover:text-[#3989ff] transition-all cursor-pointer"
            >
                <CloseFilledIcon className="w-4 h-4" />
            </span>

            <LazyLoadImage
                className={classNames('w-full h-full', isRenderImage ? 'object-cover' : 'object-contain')}
                alt={file.name}
                src={bgImage}
                onLoad={handleLoad}
            />

            {bgImage === '/empty-file.svg' && (
                <span className="uppercase mt-[5px] absolute text-[26px] font-medium text-white tracking-[0.2px]">
                    {file.name.split('.').at(-1).substring(0, 3)}
                </span>
            )}
        </div>
    );
};

AttachFile.propTypes = {
    file: PropTypes.object.isRequired,
};

export default withErrorBoundary(AttachFile, {
    fallback: null,
    onError: (error, info) => {
        toast.error('AttachFile::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
