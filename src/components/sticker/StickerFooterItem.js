import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const StickerFooterItem = ({ item, onClick = () => {} }) => {
    return (
        <div onClick={onClick} className="p-2 flex-shrink-0 cursor-pointer hover:-translate-y-0.5 transition-all">
            <LazyLoadImage className="w-8 h-8" src={item.icon} alt={item.name} />
        </div>
    );
};

StickerFooterItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default StickerFooterItem;
