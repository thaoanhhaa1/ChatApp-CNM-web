import PropTypes from 'prop-types';
import { DownloadLineIcon, FileTextFillIcon, ImageFillIcon, MoreFillIcon } from '~/assets';
import { convertFileSize } from '~/utils';
import Button from './Button';

const getIcon = (fileName) => {
    if (/\.(jpg|jpeg|png|gif|bmp)$/i.test(fileName)) return ImageFillIcon;

    // Regex video: /\.(mp4|mkv|avi|mov|wmv|flv)$/i

    return FileTextFillIcon;
};

const AttachedFile = ({ file }) => {
    const Icon = getIcon(file.name);

    return (
        <div className="flex gap-2 sm:gap-4 items-center p-2 border border-separate dark:border-[#39414b] rounded bg-white dark:bg-dark">
            <div className="text-primary-color bg-[#e3e1fc] dark:bg-[rgba(114,105,239,.15)] w-12 h-12 rounded flex justify-center items-center">
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <h5 className="text-sm font-semibold mb-1 line-clamp-1">{file.name}</h5>
                {file.size && (
                    <p className="text-ss text-secondary dark:text-dark-secondary">{convertFileSize(file.size)}</p>
                )}
            </div>
            <div className="flex gap-1 sm:gap-2">
                <Button icon={DownloadLineIcon} />
                <Button icon={MoreFillIcon} />
            </div>
        </div>
    );
};

AttachedFile.propTypes = {
    file: PropTypes.object.isRequired,
};

export default AttachedFile;