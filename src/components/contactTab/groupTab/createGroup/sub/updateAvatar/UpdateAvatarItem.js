import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const UpdateAvatarItem = ({ url, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer hover:grayscale-[30%] aspect-square rounded-full overflow-hidden border border-[#b6bec9] transition-all"
        >
            <LazyLoadImage className="w-full h-full object-cover" alt="" src={url} />
        </div>
    );
};

UpdateAvatarItem.propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default UpdateAvatarItem;
