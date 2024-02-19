import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CloseFilledIcon } from '~/assets';
import { removeFile } from '~/features/attachFiles/attachFilesSlice';

const AttachFile = ({ file }) => {
    const dispatch = useDispatch();

    const handleRemoveFile = () => dispatch(removeFile(file.id));

    return (
        <div
            style={{
                backgroundImage: 'url(https://chat.zalo.me/assets/icon-word.d7db8ecee5824ba530a5b74c5dd69110.svg)',
            }}
            className="cursor-pointer bg-center bg-no-repeat bg-contain w-[100px] h-[100px] rounded-md border border-[#d6dbe1] relative overflow-hidden"
        >
            <div className="text-ellipsis overflow-hidden absolute bottom-0 left-0 right-0 px-1 py-0.5 text-ss leading-normal text-center bg-black bg-opacity-50 text-white">
                {file.name}
            </div>
            <span
                onClick={handleRemoveFile}
                className="absolute top-0.5 right-0.5 text-[#7589a3] hover:text-[#005ae0] transition-all cursor-pointer"
            >
                <CloseFilledIcon className="w-4 h-4" />
            </span>
        </div>
    );
};

AttachFile.propTypes = {
    file: PropTypes.object.isRequired,
};

export default AttachFile;
