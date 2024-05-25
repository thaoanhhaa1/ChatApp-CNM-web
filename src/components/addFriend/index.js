import PropTypes from 'prop-types';
import ProfileHeader from '../addContact/sub/ProfileHeader';
import Switch from '../switch';
import { TextareaCountChar } from '../textarea';
import { withErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

const AddFriend = ({ maxLength, blockViewTitle = '', data, setData }) => {
    const handleChangeMessage = (message) =>
        setData((data) => ({
            ...data,
            message,
        }));
    const handleChangeBlockView = (blockView) =>
        setData((data) => ({
            ...data,
            blockView,
        }));

    return (
        <div>
            <ProfileHeader />
            <div className="p-2 ex:p-3 sm:p-4">
                <TextareaCountChar
                    className="h-[120px]"
                    maxLength={maxLength}
                    onChangeText={handleChangeMessage}
                    value={data.message}
                />

                <label className="cursor-pointer mt-2 ex:mt-3 sm:mt-4 h-11 px-2 ex:-px-3 sm:px-4 rounded bg-[#f3f5f6] dark:bg-[#2c2e2f] flex items-center justify-between">
                    <span className="text-sm leading-normal">{blockViewTitle}</span>
                    <Switch checked={data.blockView} onChange={handleChangeBlockView} />
                </label>
            </div>
        </div>
    );
};

AddFriend.propTypes = {
    maxLength: PropTypes.number.isRequired,
    data: PropTypes.shape({
        message: PropTypes.string.isRequired,
        blockView: PropTypes.bool.isRequired,
    }).isRequired,
    setData: PropTypes.func.isRequired,
    blockViewTitle: PropTypes.string.isRequired,
};

export default withErrorBoundary(AddFriend, {
    fallback: null,
    onError: (error, info) => {
        toast.error('AddFriend::Some errors occurred, please try again');
        console.error('🚀 ~ error:', error);
        console.error('🚀 ~ info:', info);
    },
});
