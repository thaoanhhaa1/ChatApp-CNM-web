import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { classNames } from '~/utils';

const DropZone = ({ height, title, description, onDrop = () => {} }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div style={{ height: `${height}px` }} className="p-2 h-full" {...getRootProps()}>
            <div
                className={classNames(
                    'pointer-events-none flex flex-col justify-center items-center gap-1 h-full border-2 border-dashed rounded-lg transition-all',
                    isDragActive ? 'border-primary-color' : 'border-secondary',
                )}
            >
                <div className="text-lg leading-normal font-medium">{title}</div>
                <p className="text-sm leading-normal">{description}</p>
            </div>
            <input {...getInputProps()} />
        </div>
    );
};

DropZone.propTypes = {
    height: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    onDrop: PropTypes.func,
};

export default DropZone;
