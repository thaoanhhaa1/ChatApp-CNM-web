import PropTypes from 'prop-types';

const MessageLoading = ({ loading }) => {
    if (loading)
        return (
            <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center">
                <span className="w-10 h-10 border-2 border-primary-color border-t-transparent animate-spin rounded-full"></span>
            </div>
        );

    return null;
};

MessageLoading.propTypes = {
    loading: PropTypes.bool,
};

export default MessageLoading;
